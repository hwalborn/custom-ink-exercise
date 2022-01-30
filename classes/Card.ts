class Card { 
    constructor(public value: string,
                public image: string,
                public id: string,
                public isFlipped: boolean = false, 
                public style: any = {}) { }
}

export default Card;