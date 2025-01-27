export interface Pokemon {
    id: number;
    name: string;
    frenchName: string;

    sprites: {
        front_default: string;
    };

    types: {
        type: {
            name: string;
        }
    }[];
    weight: number;
    height: number;
    stats: {
        base_stat: number;
    }
}
