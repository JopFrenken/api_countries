export default eventHandler(async (event) => {
    try {
        const query = getQuery(event);
        let page: any = query.page!;
        page = parseInt(page);
        let previousPage = page - 1;
        let nextPage = page + 1;

        // Get the 'page' query parameter, default to page 1 if not provided
        const itemsPerPage = 13;

        // Fetch all items (countries) from the API
        const response = await fetch('https://restcountries.com/v3.1/all');
        const allItems = await response.json();
        const maxPages = Math.ceil(allItems.length / itemsPerPage);

        page = Math.max(1, Math.min(page, maxPages));
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        previousPage = Math.max(1, Math.min(previousPage, maxPages));
        nextPage = Math.max(1, Math.min(nextPage, maxPages));

        if (previousPage == page) previousPage = -1;
        if (nextPage == page) nextPage = -1;

        // Paginate the items based on the calculated start and end indexes
        const paginatedItems = allItems.slice(startIndex, endIndex);

        return {
            succes: "true",
            countries: paginatedItems,
            maxPages,
            page,
            previousPage,
            nextPage
        }
    } catch (error) {
        console.error(error);
    }
});
