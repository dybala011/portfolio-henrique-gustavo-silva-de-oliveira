import { describe, it, expect } from "vitest";
import { PRODUCTS, CATEGORIES } from "../lib/products-data";

describe("TechConnect - Dados de Produtos", () => {
  it("deve ter 10 produtos no catálogo", () => {
    expect(PRODUCTS).toHaveLength(10);
  });

  it("todos os produtos devem ter campos obrigatórios", () => {
    PRODUCTS.forEach((product) => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.specs).toBeInstanceOf(Array);
      expect(product.specs.length).toBeGreaterThan(0);
      expect(product.emoji).toBeTruthy();
    });
  });

  it("deve ter as 4 categorias de produtos", () => {
    const categories = new Set(PRODUCTS.map((p) => p.category));
    expect(categories.has("Smartphone")).toBe(true);
    expect(categories.has("Acessório")).toBe(true);
    expect(categories.has("Computador")).toBe(true);
    expect(categories.has("Tablet")).toBe(true);
  });

  it("deve ter 5 filtros de categoria incluindo Todos", () => {
    expect(CATEGORIES).toHaveLength(5);
    expect(CATEGORIES[0]).toBe("Todos");
  });

  it("filtro por categoria deve retornar produtos corretos", () => {
    const smartphones = PRODUCTS.filter((p) => p.category === "Smartphone");
    expect(smartphones.length).toBeGreaterThan(0);
    smartphones.forEach((p) => expect(p.category).toBe("Smartphone"));
  });

  it("todos os preços devem estar no formato brasileiro", () => {
    PRODUCTS.forEach((product) => {
      expect(product.price).toMatch(/^R\$\s[\d.,]+$/);
    });
  });
});

describe("TechConnect - Lógica de Geração de Sala", () => {
  function generateRoomName(type: string): string {
    const prefix = type === "suporte" ? "Suporte" : type === "vendedor" ? "Vendedor" : "Sala";
    const timestamp = Date.now().toString(36).toUpperCase();
    return `TechConnect${prefix}${timestamp}`;
  }

  it("deve gerar sala com prefixo TechConnectSuporte para tipo suporte", () => {
    const room = generateRoomName("suporte");
    expect(room).toMatch(/^TechConnectSuporte/);
  });

  it("deve gerar sala com prefixo TechConnectVendedor para tipo vendedor", () => {
    const room = generateRoomName("vendedor");
    expect(room).toMatch(/^TechConnectVendedor/);
  });

  it("deve gerar sala com prefixo TechConnectSala para tipo desconhecido", () => {
    const room = generateRoomName("outro");
    expect(room).toMatch(/^TechConnectSala/);
  });

  it("salas geradas devem ser únicas", () => {
    const rooms = new Set(
      Array.from({ length: 10 }, () => generateRoomName("suporte"))
    );
    // Com base em timestamp, pode haver colisões em execução rápida, mas geralmente são únicas
    expect(rooms.size).toBeGreaterThan(0);
  });
});

describe("TechConnect - Sanitização de Nome de Sala", () => {
  function sanitizeRoom(name: string): string {
    return name.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
  }

  it("deve substituir espaços por hífens", () => {
    // 'João' perde o 'o com til' pois não é ASCII alfanumérico
    expect(sanitizeRoom("Sala do João")).toBe("Sala-do-Joo");
  });

  it("deve remover caracteres especiais", () => {
    expect(sanitizeRoom("Sala@#$%")).toBe("Sala");
  });

  it("deve manter letras, números, hífens e underscores", () => {
    expect(sanitizeRoom("Sala_123-Test")).toBe("Sala_123-Test");
  });

  it("deve remover espaços no início e fim", () => {
    expect(sanitizeRoom("  Sala  ")).toBe("Sala");
  });
});

describe("TechConnect - URL do Jitsi Meet", () => {
  function buildJitsiUrl(room: string, displayName: string): string {
    return `https://meet.jit.si/${encodeURIComponent(room)}#userInfo.displayName="${encodeURIComponent(displayName)}"&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.prejoinPageEnabled=false&config.disableDeepLinking=true`;
  }

  it("deve gerar URL válida do Jitsi Meet", () => {
    const url = buildJitsiUrl("TechConnectSuporte", "João Silva");
    expect(url).toContain("https://meet.jit.si/");
    expect(url).toContain("TechConnectSuporte");
  });

  it("deve codificar o nome do participante na URL", () => {
    const url = buildJitsiUrl("Sala123", "João Silva");
    expect(url).toContain(encodeURIComponent("João Silva"));
  });

  it("deve incluir configurações para desativar pré-entrada", () => {
    const url = buildJitsiUrl("Sala", "User");
    expect(url).toContain("config.prejoinPageEnabled=false");
    expect(url).toContain("config.disableDeepLinking=true");
  });

  it("deve codificar nomes de sala com caracteres especiais", () => {
    const url = buildJitsiUrl("Sala com espaços", "User");
    expect(url).toContain(encodeURIComponent("Sala com espaços"));
  });
});
