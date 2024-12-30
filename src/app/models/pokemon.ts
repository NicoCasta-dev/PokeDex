export interface Pokemon {
    id: number;
    name: string;
    frenchName: string;
    weight: number;
    height: number;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        }
    }[];
    stats: {
        base_stat: number;
    }
}
