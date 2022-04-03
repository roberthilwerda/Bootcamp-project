


get_6_most_popular_genres_last_3_months = """
    SELECT genre, COUNT(*) FROM raw_data
    WHERE date > (SELECT date FROM raw_data ORDER BY date DESC LIMIT 1) - interval '3 month'
    GROUP BY genre
    ORDER BY count DESC
    LIMIT 6"""


get_chart_data_of_most_popular_genre_of_last_3_months = """
    WITH top AS (
    SELECT genre, COUNT(*) FROM raw_data
    WHERE date > (SELECT date FROM raw_data ORDER BY date DESC LIMIT 1) - interval '3 month'
    GROUP BY genre
    ORDER BY count DESC
    LIMIT 1
    )

    SELECT top.genre, raw_data.* FROM top, raw_data
    WHERE top.genre = raw_data.genre
    ORDER BY raw_data.date DESC"""