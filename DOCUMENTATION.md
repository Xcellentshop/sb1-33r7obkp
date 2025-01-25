# Atualização da Documentação - Sistema de Rastreamento

## Implementação de Scripts de Rastreamento

### 1. Componentes Adicionados/Modificados

#### 1.1 ScriptLoader
- Implementação centralizada de todos os scripts de rastreamento
- Suporte para:
  - Google Tag Manager
  - Facebook Pixel
  - Google Ads
  - Google Analytics
  - Scripts personalizados (head/body)

#### 1.2 TrackingButton
- Componente reutilizável para botões com rastreamento
- Dispara eventos automaticamente para todas as plataformas
- Inclui dados contextuais do botão e página

#### 1.3 useTracking Hook
- Hook personalizado para rastreamento de eventos
- Função unificada para disparo de eventos em todas as plataformas
- Inclui dados de localização da página automaticamente

### 2. Configurações Disponíveis no Painel Admin

- Facebook Pixel ID
- Google Ads Tag
- Google Analytics Tag
- Google Tag Manager ID
- Scripts personalizados para head
- Scripts personalizados para body
- ID do vídeo Wistia

### 3. Eventos de Conversão Implementados

Todos os botões de ação principais agora disparam eventos para:
- Facebook Pixel
- Google Analytics
- Google Ads
- Google Tag Manager

Eventos padrão implementados:
- `page_view`: Visualização de página
- `lead_start`: Início do formulário de contato
- `lead_complete`: Envio do formulário de contato
- `demo_request`: Solicitação de demonstração
- `contact_whatsapp`: Clique no botão do WhatsApp

### 4. Integração com Páginas Dinâmicas

- Scripts de rastreamento funcionam automaticamente em páginas geradas dinamicamente
- Eventos personalizados incluem dados da cidade quando aplicável
- Suporte para tracking de conversões específicas por cidade

### 5. Instruções de Uso

#### 5.1 Configuração
1. Acesse o painel administrativo
2. Vá para a seção de configurações
3. Preencha os IDs das plataformas de analytics
4. Configure scripts personalizados se necessário
5. Salve as configurações

#### 5.2 Implementação de Novos Eventos
```typescript
import { useTracking } from '../hooks/useTracking';

function MyComponent() {
  const { trackEvent } = useTracking();

  const handleAction = () => {
    trackEvent('event_name', {
      custom_data: 'value'
    });
  };
}
```

#### 5.3 Uso do TrackingButton
```typescript
<TrackingButton
  eventName="demo_request"
  eventData={{ source: 'header' }}
  href="https://viewer.atendimentochat.store/pegma"
  className="btn btn-primary"
>
  Solicitar Demo
</TrackingButton>
```

### 6. Verificação de Funcionamento

Para verificar se os scripts estão funcionando:

1. Facebook Pixel:
   - Use o Facebook Pixel Helper (extensão Chrome)
   - Verifique se eventos são recebidos no Events Manager

2. Google Analytics:
   - Use o Google Analytics Debugger
   - Verifique o Real-Time no painel do GA

3. Google Tag Manager:
   - Use o Preview mode do GTM
   - Verifique se os eventos aparecem no debug panel

4. Google Ads:
   - Verifique o tag setup no painel do Google Ads
   - Use o Tag Assistant para validar a implementação

### 7. Manutenção e Atualizações

- Mantenha os IDs de rastreamento atualizados
- Monitore a performance dos eventos
- Verifique regularmente se novos botões/ações precisam de rastreamento
- Atualize scripts personalizados conforme necessário

### 8. Próximas Implementações Sugeridas

1. Dashboard de analytics integrado no painel admin
2. Relatórios de conversão por cidade
3. A/B testing integrado
4. Automação de relatórios de performance