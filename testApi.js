const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json()
    
    users.forEach(user => {
        console.log(`${user.name} lives in ${user.address.city} city. \n`)
    });
}

getUsers()  

// Spočítej počet anuitních splátek
// Den splácení je dán maturitním datem

const getPayments = (contractDate, drawdownCount, maturityDate) => {
    let firstPaymentDate;

    if(contractDate.getDate() < maturityDate.getDate()) {
        // První splátka je v tom samém měsící jako podpis smlouvy
        firstPaymentDate = new Date(contractDate.getFullYear(), contractDate.getMonth(), maturityDate.getDate())
    } else {
        // První splátka je v další měsící po podpisu smlouvy
        firstPaymentDate = new Date(contractDate.getFullYear(), contractDate.getMonth() + 1, maturityDate.getDate())
    }

    let payments = (maturityDate.getFullYear() - firstPaymentDate.getFullYear()) * 12
    payments += maturityDate.getMonth() - firstPaymentDate.getMonth() 
    payments -= drawdownCount

    return payments + 1
}