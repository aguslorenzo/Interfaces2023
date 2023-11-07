"use strict";

class Player{

    chips = [];

    constructor(username){
        this.username=username;
    }

    getUsername(){
        return this.username;
    }


    addChip(chip){
        this.chips.push(chip);
    }

    getChips(){
        return this.chips;
    }

    emptyChips(){
        this.chips = [];
    }

    useChip(){
        this.chips.pop();
    }


}