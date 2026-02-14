import { Project, FAQItem } from './types';

const PROJECTS_EN: Project[] = [];

const PROJECTS_FR: Project[] = [];

const FAQ_DATA_EN: FAQItem[] = [
  {
    question: "How long does a typical website project take?",
    answer: "It depends on the complexity, but a standard professional website typically takes 2 to 4 weeks from start to launch. This includes design, development, and testing. The timeline often depends on how quickly you can provide the content (text and images)."
  },
  {
    question: "Will I be able to update the website myself?",
    answer: "Absolutely. I build websites with the end-user in mind. Whether we use a CMS or a custom dashboard, I ensure you have full control to edit text, swap images, and post updates without needing to write a single line of code."
  },
  {
    question: "Do you offer support after the site is launched?",
    answer: "Yes. I provide 30 days of complimentary support after launch to ensure everything runs smoothly. After that, I offer optional maintenance packages for updates, backups, and security checks, or you can manage it entirely on your own."
  },
  {
    question: "How does payment work?",
    answer: "I typically work with a 50/50 structure: a 50% deposit to secure your slot and start the project, and the remaining 50% upon completion and your final approval, just before we go live."
  },
  {
    question: "Do you help with hosting and domain names?",
    answer: "Yes! If you don't have them yet, I will guide you through purchasing a domain and setting up high-performance hosting. If you already have them, I can easily migrate your new site to your existing setup."
  }
];

const FAQ_DATA_FR: FAQItem[] = [
  {
    question: "Combien de temps prend un projet de site web typique ?",
    answer: "Cela dépend de la complexité, mais un site web professionnel standard prend généralement de 2 à 4 semaines, du début au lancement. Cela inclut le design, le développement et les tests. Le calendrier dépend souvent de la rapidité avec laquelle vous pouvez fournir le contenu."
  },
  {
    question: "Pourrai-je mettre à jour le site moi-même ?",
    answer: "Absolument. Je construis des sites web en pensant à l'utilisateur final. Que nous utilisions un CMS ou un tableau de bord personnalisé, je m'assure que vous ayez un contrôle total pour modifier le texte, changer les images et publier des mises à jour sans avoir besoin d'écrire une seule ligne de code."
  },
  {
    question: "Offrez-vous un support après le lancement du site ?",
    answer: "Oui. Je fournis 30 jours de support gratuit après le lancement pour assurer que tout fonctionne bien. Ensuite, je propose des forfaits de maintenance optionnels pour les mises à jour et la sécurité, ou vous pouvez le gérer vous-même."
  },
  {
    question: "Comment fonctionne le paiement ?",
    answer: "Je travaille généralement avec une structure 50/50 : un acompte de 50 % pour réserver votre créneau et démarrer le projet, et les 50 % restants à la fin, juste avant la mise en ligne."
  },
  {
    question: "Aidez-vous pour l'hébergement et les noms de domaine ?",
    answer: "Oui ! Si vous n'en avez pas encore, je vous guiderai pour l'achat d'un domaine et la configuration d'un hébergement haute performance. Si vous en avez déjà, je peux facilement migrer votre nouveau site vers votre configuration existante."
  }
];

export const getProjects = (lang: 'en' | 'fr') => lang === 'fr' ? PROJECTS_FR : PROJECTS_EN;
export const getFaqData = (lang: 'en' | 'fr') => lang === 'fr' ? FAQ_DATA_FR : FAQ_DATA_EN;