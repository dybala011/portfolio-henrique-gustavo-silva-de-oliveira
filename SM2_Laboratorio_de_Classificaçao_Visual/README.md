# Projeto: Laboratorio de Classificação Visual

Projeto acadêmico utilizando o Teachable Machine para criar um modelo de visão computacional capaz de distinguir um modelo de detecção de calçados falsificados.

## 🧐 O Problema: Mecanismo do Viés

O viés de seleção ocorre quando um algoritmo é treinado com conjuntos de dados restritos ou desbalanceados. Isso faz com que o sistema aprenda padrões incorretos.

### Exemplos de Falhas no Sistema:
**Falsos Negativos**: Marcar um tênis original (como um Nike) como falso apenas devido ao seu valor de mercado baixo no momento da análise.
**Falsos Positivos**: Não reconhecer falsificações de modelos populares e amplamente replicados, como o *Adidas Yeezy Boost 350*.

## ⚠️ Consequências Sociais e Econômicas

A falha na classificação visual não é apenas um erro técnico; ela gera impactos reais:
* Prejuízos financeiros para vendedores e compradores.
* Consumidores sendo enganados por produtos não autênticos.
* Aumento da desigualdade entre comerciantes e perda de credibilidade nas plataformas digitais.

## 🛠️ Ação Mitigadora: Revisão Humana

Para solucionar o viés, o projeto propõe a inserção de especialistas humanos na curadoria dos dados antes e depois do treinamento.

**Curadoria de Dados**: Especialistas verificam a autenticidade de exemplos de marcas como Nike e Adidas para equilibrar o *dataset*.
**Análise de Casos Duvidosos**: Humanos tratam as incertezas que o algoritmo não consegue resolver sozinho.
**Monitoramento Contínuo**: Supervisão do sistema após a implementação para garantir equidade na classificação.

## 📊 Demonstração Técnica (Teachable Machine)

Foi realizado um teste prático utilizando a ferramenta **Teachable Machine** da Google. No exemplo documentado:
**Entrada**: Imagem de um tênis via webcam.
**Resultado do Modelo**: O sistema classificou o item como **86% Tenis Falso** e apenas **14% Tenis Original**.

## ✅ Resultados Esperados
Com a aplicação das medidas mitigadoras, espera-se obter dados mais justos, redução drástica nos erros de classificação e maior equidade para todos os usuários da plataforma.
