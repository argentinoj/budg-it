export class TransactionItem{
    constructor(_amount, _title, _spontaneous, _id){

        this.state = ({
            amount: _amount,
            title: _title,
            spontaneous: _spontaneous,
            id: _id,
        });
    }
    
    getAmount(){
        return this.state.amount;
    }

    getTitle(){
        return this.state.title;
    }

    getSpontaneous(){
        return this.state.spontaneous;
    }
};