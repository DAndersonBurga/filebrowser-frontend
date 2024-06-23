const formatDate = (date) => {
    const d = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }

    return d.toLocaleDateString("es-ES", options)
}

export {
    formatDate
}