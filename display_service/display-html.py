import os
import pandas as pd
import numpy as np
import jinja2

from jinja2 import Environment, FileSystemLoader
template_env = Environment(loader=FileSystemLoader('templates/'))

# Project specific global variables: paths, URIs, etc.
file_abspath = os.path.abspath(__file__)
file_basename = os.path.basename(file_abspath)
file_dirname = os.path.dirname(file_abspath)


def main():
    """The main function."""
    os.chdir(file_dirname)

    df: pd.DataFrame = pd.read_pickle('../out/dataframe.pickle')


    # Generate HTML from template.

    # template = template_env.get_template('simple-template.html')
    template = template_env.get_template('bootstrap-template.html')
    output_html = template.render(dataframe=df.to_html(table_id="table", border=0))

    # Write generated HTML to file.
    with open("demo.html", "w", encoding="utf-8") as file_obj:
        file_obj.write(output_html)


if __name__ == "__main__":
    main()