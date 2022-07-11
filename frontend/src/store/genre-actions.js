import { uiActions } from "./ui-slice";
import { genreActions } from "./genre-slice";

export const fetchData = (genre) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/get_all_enhanced`)

            if (!response.ok) {
                throw new Error("Fetching genre data failed.");
              }

            const data = await response.json();
            console.log(data)
            return data
        }

        try {
            const allData = await fetchData();
            dispatch(genreActions.replaceAllData({
              allData: allData || [],
            }));
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error!",
                  message: "Fetching cart data failed.",
                })
              );
        }


    }
}



