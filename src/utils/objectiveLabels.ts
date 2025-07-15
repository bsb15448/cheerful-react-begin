export const getObjectiveLabel = (objective: string): string => {
  const labels: Record<string, string> = {
    // Ages 1-4
    'confiance_soi': 'La confiance en soi',
    'proprete': 'LA propreté',
    'anniversaire': 'Mon Anniversaire',
    'rentree_creche': 'Ma rentrée à la crèche',
    'rentree_petite': 'Ma rentrée en petite section',
    'rentree_moyenne': 'Ma rentrée en moyenne section',
    
    // Ages 5-9
    'confiance': 'La confiance',
    'perseverance': 'La persévérance',
    'courage': 'Le courage',
    'partage': 'Le partage',
    'travail_equipe': 'Le travail d\'équipe',
    'empathie': 'L\'Empathie',
    'separation_divorce': 'Séparation et divorce',
    'anniversaire_grand': 'Mon anniversaire',
    
    // Legacy values (for backward compatibility)
    'creativite': 'Stimuler la créativité'
  };
  
  return labels[objective] || objective;
};