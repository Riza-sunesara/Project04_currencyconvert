#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,2000);
    })
}

let money={
    PKR: {
        PKR: 1,
        CAD: 0.0049,
        EUR: 0.0034,
        AED: 0.013,
        USD: 0.0036
    },
    
    AED:  {
        PKR: 75.63,
        CAD: 0.37,
        EUR: 0.26,
        AED: 1,
        USD: 0.27
    },
    
    EUR:  {
        PKR: 291.88,
        CAD: 1.45,
        EUR: 1,
        AED: 3.86,
        USD: 1.05
    },
    
    CAD:  {
        PKR: 202.01,
        CAD: 1,
        EUR: 0.69,
        AED: 2.67,
        USD: 0.72
    },
    
    USD: {
        PKR: 277.85,
        CAD: 1.37,
        EUR: 1.05,
        AED: 3.67,
        USD: 1
    }
}

interface Required{
    currency:"PKR"|"USD"|"CAD"|"AED"|"EUR",
    convertcurrency:"PKR"|"USD"|"CAD"|"AED"|"EUR",
    amount:number
}

let conversion=async()=>{

    
let ask:Required=await inquirer.prompt([
    {
        message:"What is your currency unit?",
        choices:["USD","PKR","EUR","CAD","AED"],
        type:"list",
        name:"currency"
    },
    {
        message:"What is the currency unit you want to convert in?",
        choices:["USD","PKR","EUR","CAD","AED"],
        type:"list",
        name:"convertcurrency"
    },
    {
        message:"Enter the amount you want to convert?",
        type:"number",
        name:"amount"
    }
])


if(ask.currency&&ask.convertcurrency&&ask.amount){
    console.log(`${ask.amount}${ask.currency}=${money[ask.currency][ask.convertcurrency]*ask.amount}${ask.convertcurrency}`);
    let repeat=await inquirer.prompt([
        {
            message:"Do you want to continue currency conversion?",
            name:"again",
            type:"list",
            choices:["YES","NO"]
        }
    ])
    if(repeat.again=="YES"){conversion();}
    else{
        console.log("Exiting...");
        
    }
}
else {
    console.log("selected currency is not in the list");
}

}
conversion();