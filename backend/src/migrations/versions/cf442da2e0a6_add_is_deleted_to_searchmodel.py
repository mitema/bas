"""add is_deleted to SearchModel

Revision ID: cf442da2e0a6
Revises: 23f140e794ff
Create Date: 2022-09-26 19:23:44.140210

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf442da2e0a6'
down_revision = '23f140e794ff'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('search_model', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_deleted', sa.Boolean(), server_default=sa.text('false'), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('search_model', schema=None) as batch_op:
        batch_op.drop_column('is_deleted')

    # ### end Alembic commands ###
