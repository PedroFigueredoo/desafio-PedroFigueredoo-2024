class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { MACACO: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { GAZELA: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { LEAO: 1 } }
        ];

        this.animaisInfo = {
            LEAO: { tamanho: 3, bioma: 'savana', carnívoro: true },
            LEOPARDO: { tamanho: 2, bioma: 'savana', carnívoro: true },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animaisInfo[animal]) {
            return { erro: 'Animal inválido' };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
        }

        const infoAnimal = this.animaisInfo[animal];
        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            // Verificar se o bioma do recinto é compatível com o bioma do animal
            let biomaAdequado = Array.isArray(infoAnimal.bioma)
                ? infoAnimal.bioma.some(b => recinto.bioma === b || recinto.bioma.includes(b))
                : recinto.bioma === infoAnimal.bioma || (recinto.bioma === 'savana e rio' && infoAnimal.bioma === 'savana');

            if (!biomaAdequado) continue;

            // Verificar se o recinto já contém carnívoros
            let recintoTemCarnivoros = Object.keys(recinto.animais).some(esp => this.animaisInfo[esp]?.carnívoro);

            // Se o recinto já tem carnívoros, só pode adicionar carnívoros
            if (recintoTemCarnivoros && !infoAnimal.carnívoro) {
                continue;
            }

            // Verifica se o recinto já possui animais da mesma espécie
            let espacoExtra = Object.keys(recinto.animais).length > 0 ? 1 : 0;
            if (Object.keys(recinto.animais).some(esp => esp === animal)) {
                espacoExtra = 0; // Não adicionar espaço extra para a mesma espécie
            }

            let espacoNecessario = quantidade * infoAnimal.tamanho;
            let espacoOcupado = 0;
            for (let [esp, qtd] of Object.entries(recinto.animais)) {
                espacoOcupado += this.animaisInfo[esp].tamanho * qtd;
            }

            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

            // Subtrai o espaço extra corretamente
            if (espacoExtra > 0) {
                espacoDisponivel -= espacoExtra;
            }

            if (espacoNecessario <= espacoDisponivel) {
                let espacoLivre = espacoDisponivel - espacoNecessario;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo };
