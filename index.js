let selectedPerson=null;
let spentType;
let remainingAmount;

init()

function handleClick(radio)
{
selectedPerson=radio.value
}
function handleClick1(radio)
{
    if(radio.value == 'Extras' || radio.value == 'Others')
    {
        document.getElementById('desc').style.display='block'
    }
    spentType=radio.value
}

function init()
{
    let extras=JSON.parse(localStorage.getItem('extras'));
    if(!extras)
    {
        let a=[];
        localStorage.setItem('extras',JSON.stringify(a))
    }else{
        if(extras.length)
        this.createTable(extras,'extras-body')
    }
    let history=JSON.parse(localStorage.getItem('history'));
    if(!history)
    {
        let a=[];
        localStorage.setItem('history',JSON.stringify(a))
    }else{
        if(history.length)
        this.createTable(history,'history-body')
    }
    let remainingAmount=JSON.parse(localStorage.getItem('remaining'));
    if(!remainingAmount)
    {
        localStorage.setItem('remaining',JSON.stringify('25000'))
        renderEl('25000');
    }else{
        renderEl(remainingAmount);
    }
}

function saveData()
{
        let price=document.getElementById('price-input').value
        let desc=document.getElementById('desc').value
        if(spentType == 'Others' && !desc)
        {
            alert('Please enter reason');
            return;
        }
        if(!price)
        {
            alert('Please enter amount');
            return;
        }
        if(spentType && (spentType == 'Extras' && !selectedPerson))
        {
            alert('Please Select Person');
            return;
        }
        if(!spentType)
        {
            alert('Please Select Spent Type');
            return;
        }
    if((spentType == 'Extras' && selectedPerson)||spentType )
    {
        if(spentType == 'Extras')
        {
            if(!desc)
            {
                alert('please enter description');
                return;
            }
            let extras=JSON.parse(localStorage.getItem('extras'));
            let a={person:selectedPerson,desc:desc,amount:price}
            extras.push(a)
            localStorage.setItem('extras',JSON.stringify(extras));
            this.createTable([a],'extras-body')
            document.getElementById('desc').style.display='none'
        }else{
            let history=JSON.parse(localStorage.getItem('history'));
            let a={desc:spentType  == 'Others' ?desc:spentType,amount:price}
            history.push(a)
            localStorage.setItem('history',JSON.stringify(history));
            this.createTable([a],'history-body')
            let remainingAmount=JSON.parse(localStorage.getItem('remaining'));
            if(remainingAmount)
            {
                let balance=parseFloat(remainingAmount) - parseFloat(price);
                localStorage.setItem('remaining',JSON.stringify(balance));
                renderEl(balance)
            }

        }
        resetValues()
        toggleModal()
    }
}


function createTable(arr,type)
{
    let className='.'+type
    let tableBody=document.querySelector(className);
    for(let item of arr)
    {
        let row=document.createElement('tr');
        for(let props in item)
        {
            let cell=document.createElement('td');
            let textNode=document.createTextNode(item[props]);
            cell.appendChild(textNode)
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

function resetValues()
{ 
    let arr1=['p1','p2','p3','p4','p5']
    let arr2=['w1','w2','w3','w4','w5']
    for(let i=0;i<arr1.length;i++)
    {
        document.getElementById(arr1[i]).checked=false
        document.getElementById(arr2[i]).checked=false
    }
    document.getElementById('price-input').value =''
    document.getElementById('desc').value = ''
    spentType=null;
    selectedPerson=null;
    document.getElementById('desc').style.display='none'
}

function renderEl(value)
{
    let ele=document.querySelector('.remain');
    console.log(ele.childNodes[0]?.nodeValue);
    ele.innerHTML=value;
}

function toggleModal()
{
    let prop=document.querySelector('.modal').style.display;
    if(prop == 'block')
    {
        document.querySelector('.modal').style.display='none'
    }else{
        document.querySelector('.modal').style.display='block'
    }

}

function reset()
{
    // localStorage.clear();
    localStorage.setItem('extras',JSON.stringify([]))
    localStorage.setItem('history',JSON.stringify([]))
    localStorage.setItem('remaining','25000');
    let el1=document.querySelector('.extras-body').childNodes
    let el2=document.querySelector('.history-body').childNodes
    console.log(el1,el2);
    if(el1.length > 1)
    {
        for(let item of el1)
        {
            if(item.nodeName == 'TR')
                item.remove();
        }
    }
    if(el2.length > 1)
    {
        for(let item of el2)
        {
            if(item.nodeName == 'TR')
                item.remove();
        }
    }
    // for(let)
    // for(let)
    // console.log(childNodes);
    // for(let body of bodies)
    // {
    //     for(let child of body.childNodes)
    //     {
    //         if(child.nodeName == 'tr')
    //         {
    //             console.log(child)
    //             child.remove()

    //         }
    //     }
    // }
    renderEl(25000)
    // init()

}