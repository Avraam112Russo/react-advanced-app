/**
 * Function add query params from url to search string
 * @param params
 */
export function addQueryParams(params: Record<string, string>){

    // get query params from url
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined){
            searchParams.set(key, value);
        }
    })


    // save query params from url
    window.history.pushState(null, "", `?${searchParams.toString()}`)
}