#%%
import pandas as pd
import numpy as np
import plotly
import plotly.graph_objs as go
import plotly.figure_factory as ff
from plotly.offline import init_notebook_mode

plotly.offline.init_notebook_mode(connected=True)

#%%
# load the data
df = pd.read_excel("../data/anwender_pro_stunde_nach_20.01.00.xlsx", header=1, usecols="A:I", skiprows=0, nrows=19)
df_table = ff.create_table(df.head(19))

#%%
#plot the table
plotly.offline.plot(df_table, filename='../output/table')

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
        line=dict(width=1),
        connectgaps=True,
    ))

    # endpoints
    fig.add_trace(go.Scatter(
        x=[x_data[i][0], x_data[i][-1]],
        y=[y_data[i][0], y_data[i][-1]],
        mode='markers',
        marker=dict(size=1)
    ))

fig.update_layout(
    xaxis=dict(
        showline=True,
        showgrid=False,
        showticklabels=True,
        linewidth=2,
        ticks='outside',
        tickfont=dict(
            family='Arial',
            size=12,
        ),
    ),
    yaxis=dict(
        showgrid=False,
        zeroline=False,
        showline=False,
        showticklabels=False,
    ),
    autosize=False,
    margin=dict(
        autoexpand=False,
        l=100,
        r=20,
        t=110,
    ),
    showlegend=False,
    plot_bgcolor='white'
)

annotations = []

# Add labels
for y_trace, label in zip(y_data, labels):
    # Title
    annotations.append(dict(xref='paper', yref='paper', x=0.0, y=1.05,
                              xanchor='left', yanchor='bottom',
                              text=title,
                              font=dict(family='Arial',
                                        size=30),
                              showarrow=False))

fig.update_layout(annotations=annotations)
plotly.offline.plot(fig, filename='../output/lineplot')
#fig.show()


# %%
