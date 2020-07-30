  
const validation = {
    /* v is for the value being checked */
    empid: (v) => {
        return /^[1-9]{1,3}$/.test(v)
    },
    name: (v) => {
        return /^[A-Za-z-' ]+$/.test(v)
    },
    email: (v) => {
        return /[a-z]+[.]+[a-z]+@+[a-z]+[.]+com/.test(v)
    },
    mobile: (v) => {
        return /^[0-9]+$/.test(v)
    },
       balance: (v) => {
        return /^[0-9]+[0-9]+[.]+[0-9]+[0-9]$/
    },
    cardId: (v) => {
        return /^[A-Za-z-' 0-9]+$/.test(v)
    }
};

module.exports =  { validation };
