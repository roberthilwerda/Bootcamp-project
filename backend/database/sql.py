import billboard
import pandas as pd
from datetime import datetime, timedelta


main_billboard = []
billresults = []
current_date = datetime.strptime('2010/01/01', '%Y/%m/%d')
end_date = datetime.strptime('2010/03/31', '%Y/%m/%d')
delta = timedelta(days=30)
while current_date < end_date:
    ds = current_date.strftime('%Y-%m-%d')
    print(f'Fetching chart for {ds}')
    for ce in billboard.ChartData('billboard-200', date=ds):
        billresults.append([ce.artist])
    current_date += delta
for values in billresults:
    main_billboard.extend(values)

print(main_billboard)



