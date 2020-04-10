// import {Data} from "./data";

class ClassData implements Data {
    name: string;
    private _secret?:string;

    get secret():string|undefined {
        return this._secret;
    }

    set secret(newSecret) {
        this._secret=newSecret;
    }

    formatName() {
        return this.name;
    }
}

class First {
    static staticField: number = 0;
    constructor() {
        First.staticField++;
        console.log(`Creating First Class with ${First.staticField}`);
    }
}

class Second extends First{
    readonly readonlyString: string;
    constructor(text: string) {
        super();
        this.readonlyString = text;
    }
}

// export {ClassData,First,Second}