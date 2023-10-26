const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    const users = await res.json()
    
    users.forEach(user => {
        console.log(`${user.name} lives in ${user.address.city} city. \n`)
    });
}

getUsers()  