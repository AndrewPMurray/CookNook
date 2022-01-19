const bcrypt = require('bcrypt')

const blah = async () => {
    const hash = bcrypt.hash('password', 10)

    hash.then(res => console.log(res))
}

console.log(blah());