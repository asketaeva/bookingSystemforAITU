function uuidv4() {
    let uuid = '';

    for (let i = 0; i < 18; i++) {
        const randomValue = Math.floor(Math.random() * 10);
        uuid += randomValue;
    }

    return uuid;
}

export default uuidv4;
