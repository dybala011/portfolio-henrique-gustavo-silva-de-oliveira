# Projeto: Análise de Viés em Classificação Visual de IA

Este repositório apresenta um estudo sobre como o viés de dados pode comprometer a eficácia de sistemas de Inteligência Artificial, utilizando como exemplo um modelo de detecção de calçados falsificados.

## 🧐 O Problema: Mecanismo do Viés

[cite_start]O viés de seleção (*Selection Bias*) ocorre quando um algoritmo é treinado com conjuntos de dados restritos ou desbalanceados[cite: 186, 187]. [cite_start]Isso faz com que o sistema aprenda padrões incorretos[cite: 188].

### Exemplos de Falhas no Sistema:
* [cite_start]**Falsos Negativos**: Marcar um tênis original (como um Nike) como falso apenas devido ao seu valor de mercado baixo no momento da análise[cite: 189, 190].
* [cite_start]**Falsos Positivos**: Não reconhecer falsificações de modelos populares e amplamente replicados, como o *Adidas Yeezy Boost 350*[cite: 191].

## ⚠️ Consequências Sociais e Econômicas

[cite_start]A falha na classificação visual não é apenas um erro técnico; ela gera impactos reais[cite: 192]:
* [cite_start]Prejuízos financeiros para vendedores e compradores[cite: 192].
* [cite_start]Consumidores sendo enganados por produtos não autênticos[cite: 192].
* [cite_start]Aumento da desigualdade entre comerciantes e perda de credibilidade nas plataformas digitais[cite: 192].

## 🛠️ Ação Mitigadora: Revisão Humana (*Human-in-the-Loop*)

[cite_start]Para solucionar o viés, o projeto propõe a inserção de especialistas humanos na curadoria dos dados antes e depois do treinamento[cite: 193].

* [cite_start]**Curadoria de Dados**: Especialistas verificam a autenticidade de exemplos de marcas como Nike e Adidas para equilibrar o *dataset*[cite: 194].
* [cite_start]**Análise de Casos Duvidosos**: Humanos tratam as incertezas que o algoritmo não consegue resolver sozinho[cite: 195].
* [cite_start]**Monitoramento Contínuo**: Supervisão do sistema após a implementação para garantir equidade na classificação[cite: 195].

## 📊 Demonstração Técnica (Teachable Machine)

[cite_start]Foi realizado um teste prático utilizando a ferramenta **Teachable Machine** da Google[cite: 199, 214]. No exemplo documentado:
* [cite_start]**Entrada**: Imagem de um tênis via webcam[cite: 203].
* [cite_start]**Resultado do Modelo**: O sistema classificou o item como **86% Tenis Falso** e apenas **14% Tenis Original**[cite: 209, 210].

## ✅ Resultados Esperados
[cite_start]Com a aplicação das medidas mitigadoras, espera-se obter dados mais justos, redução drástica nos erros de classificação e maior equidade para todos os usuários da plataforma[cite: 196].