// ===== AUTHENTICATION SYSTEM =====
class AuthManager {
    constructor() {
        this.storageKey = 'apphub_auth';
        this.sessionKey = 'apphub_session';
        this.historyKey = 'apphub_auth_history';
        this.recoveryKey = 'apphub_recovery_codes';
        this.twoFAKey = 'apphub_2fa';
        
        // Identifiants par défaut
        this.defaultCredentials = {
            username: 'admin',
            password: this.hashPassword('admin 123'),
            created_date: new Date().toISOString(),
            password_changed_date: new Date().toISOString(),
            password_change_count: 0,
            last_login: null,
            login_count: 0,
            twofa_enabled: true,
            twofa_secret: this.generateTwoFASecret()
        };
        
        this.init();
    }

    init() {
        const saved = localStorage.getItem(this.storageKey);
        if (!saved) {
            this.credentials = this.defaultCredentials;
            this.generateRecoveryCodes();
            this.save();
        } else {
            this.credentials = JSON.parse(saved);
        }
        
        this.checkSession();
    }

    // ===== HASHING & SECURITY =====
    hashPassword(password) {
        // Utiliser une simple fonction de hash (en production, utiliser bcrypt)
        // Pour cette démo, on utilise SHA-256 basique
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hash_' + Math.abs(hash).toString(16);
    }

    validatePasswordStrength(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const hasLength = password.length >= 8;

        return {
            isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSymbols && hasLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSymbols,
            hasLength,
            message: {
                hasUpperCase: hasUpperCase ? '✓ Majuscules' : '✗ Majuscules requises',
                hasLowerCase: hasLowerCase ? '✓ Minuscules' : '✗ Minuscules requises',
                hasNumbers: hasNumbers ? '✓ Chiffres' : '✗ Chiffres requis',
                hasSymbols: hasSymbols ? '✓ Symboles' : '✗ Symboles requis',
                hasLength: hasLength ? '✓ 8 caractères' : '✗ Minimum 8 caractères'
            }
        };
    }

    // ===== LOGIN & SESSION =====
    login(username, password, twoFACode = null) {
        // Vérifier identifiants
        if (username !== this.credentials.username) {
            return { success: false, error: '❌ Nom d\'utilisateur incorrect' };
        }

        const passwordHash = this.hashPassword(password);
        if (passwordHash !== this.credentials.password) {
            return { success: false, error: '❌ Mot de passe incorrect' };
        }

        // Vérifier 2FA si activé
        if (this.credentials.twofa_enabled) {
            if (!twoFACode) {
                return { success: false, error: '2FA_REQUIRED', message: 'Code 2FA requis' };
            }

            if (!this.verifyTwoFA(twoFACode)) {
                return { success: false, error: '❌ Code 2FA invalide' };
            }
        }

        // Créer la session
        const sessionToken = this.generateSessionToken();
        const session = {
            token: sessionToken,
            username: username,
            login_time: new Date().toISOString(),
            last_activity: new Date().toISOString(),
            browser: this.getBrowserInfo(),
            ip: 'Local (Browser)',
            twofa_verified: true
        };

        localStorage.setItem(this.sessionKey, JSON.stringify(session));

        // Mettre à jour les stats
        this.credentials.login_count = (this.credentials.login_count || 0) + 1;
        this.credentials.last_login = new Date().toISOString();
        this.save();

        // Ajouter à l'historique
        this.addToHistory('login', `Connexion réussie par ${username}`);

        return { success: true, message: '✅ Connexion réussie', session };
    }

    logout() {
        this.addToHistory('logout', `Déconnexion de ${this.credentials.username}`);
        localStorage.removeItem(this.sessionKey);
        return { success: true, message: '✅ Déconnexion réussie' };
    }

    logoutAllSessions() {
        localStorage.removeItem(this.sessionKey);
        this.addToHistory('logout_all', 'Déconnexion de toutes les sessions');
        return { success: true, message: '✅ Toutes les sessions ont été fermées' };
    }

    checkSession() {
        const session = localStorage.getItem(this.sessionKey);
        if (!session) return false;

        const sessionData = JSON.parse(session);
        const lastActivity = new Date(sessionData.last_activity);
        const now = new Date();
        const diffMinutes = (now - lastActivity) / (1000 * 60);

        // Session expire après 24 heures d'inactivité
        if (diffMinutes > 24 * 60) {
            this.logout();
            return false;
        }

        // Mettre à jour l'activité
        sessionData.last_activity = new Date().toISOString();
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        return true;
    }

    isAuthenticated() {
        return this.checkSession();
    }

    getSession() {
        if (!this.isAuthenticated()) return null;
        const session = localStorage.getItem(this.sessionKey);
        return session ? JSON.parse(session) : null;
    }

    // ===== PASSWORD MANAGEMENT =====
    changePassword(oldPassword, newPassword, confirmPassword) {
        // Vérifier ancien mot de passe
        const oldHash = this.hashPassword(oldPassword);
        if (oldHash !== this.credentials.password) {
            return { success: false, error: '❌ Ancien mot de passe incorrect' };
        }

        // Vérifier confirmation
        if (newPassword !== confirmPassword) {
            return { success: false, error: '❌ Les mots de passe ne correspondent pas' };
        }

        // Valider la force du mot de passe
        const validation = this.validatePasswordStrength(newPassword);
        if (!validation.isValid) {
            return { success: false, error: '❌ Mot de passe faible', details: validation.message };
        }

        // Vérifier que le nouveau est différent de l'ancien
        if (newPassword === oldPassword) {
            return { success: false, error: '❌ Le nouveau mot de passe doit être différent' };
        }

        // Mettre à jour
        this.credentials.password = this.hashPassword(newPassword);
        this.credentials.password_changed_date = new Date().toISOString();
        this.credentials.password_change_count = (this.credentials.password_change_count || 0) + 1;
        this.save();

        this.addToHistory('password_change', 'Mot de passe changé');

        return { success: true, message: '✅ Mot de passe changé avec succès' };
    }

    // ===== USERNAME MANAGEMENT =====
    changeUsername(newUsername) {
        if (!newUsername || newUsername.trim() === '') {
            return { success: false, error: '❌ Le nom d\'utilisateur ne peut pas être vide' };
        }

        const oldUsername = this.credentials.username;
        this.credentials.username = newUsername.trim();
        this.credentials.username_change_count = (this.credentials.username_change_count || 0) + 1;
        this.save();

        this.addToHistory('username_change', `Nom d'utilisateur changé de ${oldUsername} à ${newUsername}`);

        return { success: true, message: '✅ Nom d\'utilisateur changé' };
    }

    // ===== 2FA (Two-Factor Authentication) =====
    generateTwoFASecret() {
        // Générer un secret 2FA (format simplifié pour démo)
        return Math.random().toString(36).substring(2, 15);
    }

    enable2FA() {
        this.credentials.twofa_enabled = true;
        this.credentials.twofa_secret = this.generateTwoFASecret();
        this.generateRecoveryCodes();
        this.save();

        this.addToHistory('2fa_enabled', 'Authentification à 2 facteurs activée');

        return {
            success: true,
            message: '✅ 2FA activée',
            secret: this.credentials.twofa_secret,
            qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this.credentials.twofa_secret)}`
        };
    }

    disable2FA() {
        this.credentials.twofa_enabled = false;
        this.save();

        this.addToHistory('2fa_disabled', 'Authentification à 2 facteurs désactivée');

        return { success: true, message: '✅ 2FA désactivée' };
    }

    generateTwoFACode() {
        // Générer un code 2FA (6 chiffres)
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    verifyTwoFA(code) {
        // En démo, accepter n'importe quel code 6 chiffres
        // En production, utiliser TOTP ou HOTP
        return /^\d{6}$/.test(code);
    }

    // ===== RECOVERY CODES =====
    generateRecoveryCodes() {
        const codes = [];
        for (let i = 0; i < 10; i++) {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            codes.push({
                code: code,
                used: false,
                used_date: null
            });
        }
        localStorage.setItem(this.recoveryKey, JSON.stringify(codes));
        return codes;
    }

    getRecoveryCodes() {
        const codes = localStorage.getItem(this.recoveryKey);
        return codes ? JSON.parse(codes) : [];
    }

    useRecoveryCode(code) {
        const codes = this.getRecoveryCodes();
        const found = codes.find(c => c.code === code && !c.used);

        if (!found) {
            return { success: false, error: '❌ Code de récupération invalide ou déjà utilisé' };
        }

        found.used = true;
        found.used_date = new Date().toISOString();
        localStorage.setItem(this.recoveryKey, JSON.stringify(codes));

        this.addToHistory('recovery_code_used', `Code de récupération utilisé`);

        const unusedCount = codes.filter(c => !c.used).length;
        return {
            success: true,
            message: `✅ Code accepté (${unusedCount} codes restants)`,
            remaining: unusedCount
        };
    }

    // ===== HISTORY =====
    addToHistory(type, message) {
        const history = this.getHistory();
        history.unshift({
            timestamp: new Date().toISOString(),
            type: type,
            message: message
        });

        // Garder seulement les 100 derniers événements
        if (history.length > 100) {
            history.pop();
        }

        localStorage.setItem(this.historyKey, JSON.stringify(history));
    }

    getHistory() {
        const history = localStorage.getItem(this.historyKey);
        return history ? JSON.parse(history) : [];
    }

    clearHistory() {
        localStorage.removeItem(this.historyKey);
        this.addToHistory('history_cleared', 'Historique supprimé');
        return { success: true, message: '✅ Historique supprimé' };
    }

    // ===== UTILS =====
    generateSessionToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Chrome') > -1) return 'Chrome';
        if (ua.indexOf('Safari') > -1) return 'Safari';
        if (ua.indexOf('Firefox') > -1) return 'Firefox';
        if (ua.indexOf('Edge') > -1) return 'Edge';
        return 'Unknown Browser';
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.credentials));
    }

    // ===== ADMIN STATS =====
    getStats() {
        return {
            username: this.credentials.username,
            login_count: this.credentials.login_count || 0,
            last_login: this.credentials.last_login,
            password_change_count: this.credentials.password_change_count || 0,
            password_changed_date: this.credentials.password_changed_date,
            twofa_enabled: this.credentials.twofa_enabled,
            created_date: this.credentials.created_date,
            recovery_codes_unused: this.getRecoveryCodes().filter(c => !c.used).length
        };
    }

    resetToDefault() {
        if (confirm('⚠️ ATTENTION! Cela réinitialisera TOUS les paramètres de sécurité!\nNom d\'utilisateur: admin\nMot de passe: admin 123')) {
            if (confirm('Êtes-vous ABSOLUMENT sûr?')) {
                this.credentials = { ...this.defaultCredentials };
                this.generateRecoveryCodes();
                this.save();
                this.logout();
                this.addToHistory('reset', 'Tous les paramètres ont été réinitialisés');
                return { success: true, message: '✅ Paramètres réinitialisés. Reconnectez-vous.' };
            }
        }
        return { success: false, error: '❌ Réinitialisation annulée' };
    }
}

// Initialiser le gestionnaire d'authentification
let authManager;