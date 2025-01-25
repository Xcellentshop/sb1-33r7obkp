interface City {
  name: string;
  state: string;
  slug: string;
  showInMenu: boolean;
  testimonials: Array<{
    name: string;
    business: string;
    content: string;
    image: string;
  }>;
}

interface State {
  name: string;
  abbreviation: string;
  cities: City[];
}

export const states: State[] = [
  {
    name: "Paraná",
    abbreviation: "PR",
    cities: [
      {
        name: "Medianeira",
        state: "PR",
        slug: "em-medianeira",
        showInMenu: true,
        testimonials: [
          {
            name: "João Silva",
            business: "Supermercado Silva",
            content: "O PEGMA 3.0 revolucionou a gestão do meu supermercado em Medianeira. O suporte local é excepcional e o sistema é muito estável.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Maria Oliveira",
            business: "Restaurante Sabor & Cia",
            content: "Excelente sistema para restaurantes. O controle de mesas e delivery integrado facilitou muito nossa operação em Medianeira.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Pedro Santos",
            business: "Loja de Materiais de Construção Santos",
            content: "O melhor investimento que fiz para minha loja em Medianeira. O controle de estoque e emissão de notas fiscais é perfeito.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          }
        ]
      },
      {
        name: "Missal",
        state: "PR",
        slug: "em-missal",
        showInMenu: true,
        testimonials: [
          {
            name: "Ana Rodrigues",
            business: "Mercado Economia",
            content: "O PEGMA 3.0 transformou completamente a gestão do meu mercado em Missal. A emissão de notas e controle de estoque são muito práticos.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Carlos Mendes",
            business: "Restaurante Sabor Caseiro",
            content: "Sistema perfeito para restaurantes. O módulo de delivery e controle de mesas facilitou muito nossa operação em Missal.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Lucia Ferreira",
            business: "Loja de Roupas Elegance",
            content: "Excelente para o varejo de roupas. O controle de estoque e vendas é muito eficiente. O suporte local em Missal é ótimo.",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          }
        ]
      },
      {
        name: "Cascavel",
        state: "PR",
        slug: "em-cascavel",
        showInMenu: true,
        testimonials: [
          {
            name: "Roberto Almeida",
            business: "Supermercados Cascavel",
            content: "O PEGMA 3.0 transformou a gestão da nossa rede de supermercados em Cascavel. A integração entre as lojas e o controle centralizado são excepcionais.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Patricia Santos",
            business: "Drogaria Saúde Total",
            content: "Excelente para o setor farmacêutico. O controle de lotes e validades é perfeito, e o suporte local em Cascavel é muito ágil.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Fernando Costa",
            business: "Restaurante Sabor Regional",
            content: "O módulo de delivery e controle de mesas revolucionou nosso restaurante. O sistema é completo e o suporte em Cascavel é excepcional.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          }
        ]
      },
      {
        name: "São Miguel do Iguaçu",
        state: "PR",
        slug: "em-sao-miguel-do-iguacu",
        showInMenu: true,
        testimonials: [
          {
            name: "Ricardo Oliveira",
            business: "Supermercado Oliveira",
            content: "O PEGMA 3.0 transformou completamente a gestão do meu supermercado em São Miguel do Iguaçu. O controle de estoque e a emissão de notas fiscais são extremamente eficientes.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Amanda Santos",
            business: "Farmácia Saúde & Vida",
            content: "Sistema perfeito para o setor farmacêutico. O controle de lotes e validades é excepcional, e o suporte local em São Miguel do Iguaçu é muito ágil.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Paulo Martins",
            business: "Restaurante Sabor do Sul",
            content: "O módulo de delivery e controle de mesas revolucionou nosso restaurante. O sistema é completo e o suporte em São Miguel do Iguaçu é excelente.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          }
        ]
      },
      {
        name: "Realeza",
        state: "PR",
        slug: "em-realeza",
        showInMenu: true,
        testimonials: [
          {
            name: "Ricardo Oliveira",
            business: "Supermercado Oliveira",
            content: "O PEGMA 3.0 revolucionou a gestão do meu supermercado em Realeza. O sistema é completo e o suporte local é excelente.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "Amanda Silva",
            business: "Farmácia Saúde Plena",
            content: "Sistema perfeito para farmácias. O controle de estoque e medicamentos é muito eficiente, facilitando nossa operação em Realeza.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          },
          {
            name: "José Santos",
            business: "Loja de Materiais de Construção Santos",
            content: "O melhor investimento para minha loja em Realeza. O controle de estoque e emissão de notas fiscais é perfeito.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          }
        ]
      }
    ]
  }
];

export const getCity = (slug: string): City | undefined => {
  for (const state of states) {
    const city = state.cities.find(city => city.slug === slug);
    if (city) return city;
  }
  return undefined;
};

export const getVisibleCities = (): City[] => {
  return states.flatMap(state => 
    state.cities.filter(city => city.showInMenu)
  );
};

export const getVisibleStates = (): State[] => {
  return states.filter(state => 
    state.cities.some(city => city.showInMenu)
  );
};

// Adicionando função de validação
export const validateCityData = (): boolean => {
  if (!states || !Array.isArray(states)) {
    console.error('Estados não estão definidos corretamente');
    return false;
  }

  return states.every(state => {
    if (!state.cities || !Array.isArray(state.cities)) {
      console.error(`Estado ${state.name} não tem array de cidades válido`);
      return false;
    }
    return true;
  });
};