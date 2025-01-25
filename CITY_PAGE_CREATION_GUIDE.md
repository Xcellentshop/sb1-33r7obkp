# Guia de Criação de Páginas de Cidades - PEGMA 3.0

Este guia detalha o processo completo para criar e integrar uma nova página de cidade no sistema PEGMA 3.0.

## 1. Configuração da Cidade

### 1.1 Adicionar Cidade ao Arquivo de Configuração
Localizar e editar o arquivo `src/config/cities.ts`:

```typescript
// 1. Certifique-se que a cidade siga a interface City corretamente
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

// 2. Adicionar nova cidade ao array de cities dentro do estado correspondente
{
  name: "NomeDaCidade",
  state: "PR", // Estado da cidade
  slug: "em-nome-da-cidade", // Formato: em-nome-da-cidade (lowercase, com hífens)
  showInMenu: true,
  testimonials: [
    {
      name: "Nome do Cliente",
      business: "Nome do Negócio",
      content: "Depoimento personalizado para a cidade",
      image: "URL da imagem do Unsplash (formato facearea)"
    },
    // Adicionar exatamente 2 outros depoimentos seguindo o mesmo padrão
  ]
}

// 3. Verificar se o estado existe antes de adicionar a cidade
// Se o estado não existir, criar primeiro o estado e depois adicionar a cidade
```

### 1.2 Atualizar Sitemap
Editar o arquivo `public/sitemap.xml`:

```xml
<!-- Adicionar nova entrada antes da seção de recursos -->
<url>
  <loc>https://pegma.com.br/em-nome-da-cidade</loc>
  <lastmod>DATA_ATUAL</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

## 2. Criação da Página

### 2.1 Criar Novo Arquivo
Criar arquivo `src/pages/nome-da-cidade.tsx` com a seguinte estrutura:

```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, X, MessageCircle, Shield, Laptop, Play } from 'lucide-react';
import Features from '../components/Features';
import Modules from '../components/Modules';
import Pricing from '../components/Pricing';
import WistiaVideo from '../components/WistiaVideo';
import { getCity } from '../config/cities';
import { useNavigate } from 'react-router-dom';

// 1. Configurar Testimonials com Validação
const citySlug = 'em-nome-da-cidade';
const cityData = getCity(citySlug);

if (!cityData) {
  console.error(`Cidade não encontrada: ${citySlug}`);
}

const testimonials = cityData?.testimonials || [];

// 2. Configurar Schema.org
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': `PEGMA 3.0 ${cityData?.name || ''}`,
  'description': `Sistema ERP completo e software de gestão empresarial para empresas em ${cityData?.name || ''}, ${cityData?.state || ''}...`,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': cityData?.name || '',
    'addressRegion': cityData?.state || '',
    'addressCountry': 'BR'
  },
  'url': `https://pegma.com.br/${citySlug}`,
  'telephone': '+55 45 XXXX-0000',
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'opens': '08:00',
    'closes': '18:00'
  }
};

// 3. Implementar Componente com Tratamento de Erros
export default function NomeDaCidadePage() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Redirecionar para home se a cidade não existir
    if (!cityData) {
      navigate('/');
      return;
    }
  }, [cityData, navigate]);

  if (!cityData) {
    return null; // ou um componente de loading/erro
  }

  return (
    <>
      <Helmet>
        <title>PEGMA 3.0 em {cityData.name} - Software de Gestão Empresarial</title>
        <meta name="description" content={`Sistema ERP completo para empresas em ${cityData.name}. Gestão empresarial moderna e eficiente para seu negócio.`} />
        <meta name="keywords" content={`ERP ${cityData.name}, gestão empresarial ${cityData.name}, software gestão ${cityData.name}, sistema empresarial ${cityData.state}`} />
        <link rel="canonical" href={`https://pegma.com.br/${citySlug}`} />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
      {/* Resto do componente */}
    </>
  );
}
```

## 3. Checklist de Validação

Antes de fazer deploy, verifique:

1. **Configuração da Cidade**:
   - [ ] Cidade adicionada corretamente no `cities.ts`
   - [ ] Interface `City` implementada completamente
   - [ ] Estado existe no array de estados
   - [ ] Todos os campos obrigatórios preenchidos

2. **Página da Cidade**:
   - [ ] Imports corretos e presentes
   - [ ] Validação de dados da cidade implementada
   - [ ] Tratamento de erro para cidade não encontrada
   - [ ] Redirecionamento configurado
   - [ ] SEO tags personalizadas
   - [ ] Schema.org configurado corretamente

3. **Testes**:
   - [ ] Testar navegação para a página
   - [ ] Verificar se testimonials são renderizados
   - [ ] Confirmar redirecionamento quando cidade não existe
   - [ ] Validar meta tags e schema.org
   - [ ] Testar responsividade

4. **Deploy**:
   - [ ] Sitemap atualizado
   - [ ] Build sem erros
   - [ ] Rota configurada corretamente
   - [ ] Cache limpo após deploy

## 4. Solução de Problemas Comuns

1. **TypeError: Cannot read properties of undefined (reading 'map')**:
   - Sempre inicialize arrays vazios como fallback
   - Use optional chaining (?.) ao acessar propriedades
   - Implemente verificações de existência de dados

2. **Página em Branco**:
   - Verificar se a cidade existe no config
   - Confirmar que todos os componentes estão importados
   - Validar dados antes de renderizar

3. **SEO não Funcionando**:
   - Confirmar Helmet configurado corretamente
   - Verificar canonical URLs
   - Validar schema.org

4. **Componentes não Renderizando**:
   - Verificar imports
   - Confirmar dados necessários presentes
   - Implementar error boundaries