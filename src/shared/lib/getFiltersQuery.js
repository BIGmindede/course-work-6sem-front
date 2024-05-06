export const getFiltersQuery = (filters) => {
    let query = ''
    Object.keys(filters).forEach(filter => {
        if (filters[filter] !== undefined && filters[filter] !== "")
            query += `${filter}=${filters[filter]}&`
    });
    query = query.slice(0, -1)
    return query
}