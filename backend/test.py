#%%

import sys
import pandas as pd
import numpy as np
import plotly
import plotly.graph_objs as go
import plotly.figure_factory as ff
from plotly.offline import init_notebook_mode


excel_data = sys.argv[1]
plot_name = '.'.join(excel_data.split('.')[:-1])
plot_table = plot_name + "-table"
plot_line = plot_name + "-lineplot"
plotly.offline.init_notebook_mode(connected=True)

#%%
# load the data
df = pd.read_excel("../data/"+excel_data, header=1, usecols="A:I", skiprows=0, nrows=19)
df_table = ff.create_table(df.head(19))

#%%
#plot the table
plotly.offline.plot(df_table, filename='./output/'+plot_table)

#%%
#plot the graph
#https://plotly.com/python/line-charts/
title = 'Anwenderzahlen'
labels = df.columns.astype(str).to_list()
labels = labels[1:]
num_series = len(labels)
df_values_only = df.iloc[:,1:num_series+1]
num_values = df_values_only.shape[0]
x_scale = df.iloc[:,0].to_numpy()
x_data = np.vstack((x_scale,)*num_series)
y_data = df_values_only.to_numpy().transpose()
#df_values_only.head()
#print(y_data)
#print(x_scale)
#print(x_data)

#%%
fig = go.Figure()
for i in range(0, num_series):
    fig.add_trace(go.Scatter(x=x_data[i], y=y_data[i], mode='lines',
        name=labels[i],
        line=dict(width=2),
        connectgaps=True,
    ))

fig.update_layout(
    xaxis=dict(
        showline=True,
        showgrid=True,
        showticklabels=True,
        linewidth=2,
        ticks='outside',
        tickfont=dict(
            family='Arial',
            size=12,
        ),
    ),
    yaxis=dict(
        showgrid=True,
        zeroline=True,
        showline=True,
        showticklabels=True,
    ),
    autosize=True,
    margin=dict(
        autoexpand=True,
        l=100,
        r=20,
        t=110,
    ),
    showlegend=True
)

#annotations = []
#fig.update_layout(annotations=annotations)

plotly.offline.plot(fig, filename='./output/'+ plot_line)
#fig.show()

print(plot_table+','+plot_line)
sys.stdout.flush()
