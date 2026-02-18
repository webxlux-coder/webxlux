# Déploiement Automatique via GitHub (Hostinger)

J'ai configuré un système de déploiement automatique. À chaque fois que vous "pousserez" du code sur GitHub, votre site sera automatiquement construit et envoyé sur Hostinger.

### Étape 1 : Commiter et Pousser le code
Exécutez ces commandes dans votre terminal :
```bash
git add .
git commit -m "Add GitHub deployment workflow"
git push origin main
```

### Étape 2 : Configurer les "Secrets" sur GitHub
Le déploiement va échouer au début car GitHub n'a pas encore vos accès Hostinger. Pour corriger cela :
1. Allez sur votre dépôt GitHub : `https://github.com/webxlux-coder/webxlux`
2. Cliquez sur **Settings** (en haut à droite).
3. Dans le menu de gauche, allez dans **Secrets and variables** -> **Actions**.
4. Cliquez sur **New repository secret** et ajoutez les secrets suivants un par un :

| Nom du Secret | Valeur à mettre |
| :--- | :--- |
| `FTP_SERVER` | L'hôte FTP de Hostinger (ex: `ftp.webxlux.com` ou l'adresse IP) |
| `FTP_USERNAME` | Votre nom d'utilisateur FTP Hostinger |
| `FTP_PASSWORD` | Votre mot de passe FTP Hostinger |
| `VITE_SUPABASE_URL` | `https://meldjfnstpdxcqrrylts.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Copiez la clé complète) |
| `VITE_EMAILJS_SERVICE_ID` | `service_qg02g3k` |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_qj2swka` |
| `VITE_EMAILJS_PUBLIC_KEY` | `OX_4PZpK8_rTML-OR` |

### Étape 3 : Vérifier le déploiement
1. Cliquez sur l'onglet **Actions** en haut de votre page GitHub.
2. Vous verrez un "Workflow" en cours d'exécution.
3. Une fois qu'il devient vert (Success), votre site est en ligne sur Hostinger !

**Note :** Cette méthode est bien meilleure car elle gère tout toute seule et évite les erreurs de fichiers "vides".
