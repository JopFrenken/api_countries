export default eventHandler(async (event) => {
    try {
        // request variables
        const query = getQuery(event);
        let page: any = query.page!;
        page = parseInt(page);
        let previousPage = page - 1;
        let nextPage = page + 1;

        // Get the 'page' query parameter, default to page 1 if not provided
        const itemsPerPage = 12;

        // Fetch all items (countries) from the API
        const response = await fetch('https://restcountries.com/v3.1/all');
        const allItems = await response.json();

        // Sort the countries alphabetically by their names
        allItems.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));

        // Calculates the max pages by the amount of items and items epr page
        const maxPages = Math.ceil(allItems.length / itemsPerPage);

        // Ensure 'page', 'previousPage', and 'nextPage' are within valid range (1 to maxPages)
        page = Math.max(1, Math.min(page, maxPages));
        previousPage = Math.max(1, Math.min(previousPage, maxPages));
        nextPage = Math.max(1, Math.min(nextPage, maxPages));

        // Calculate the start and end indexes for the current page's items
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // If 'previousPage' is the same as the current 'page', set it to -1 indicating no previous page
        if (previousPage == page) previousPage = -1;
        // If 'nextPage' is the same as the current 'page', set it to -1 indicating no next page
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
