## Database commands
 
    psql -U <username>       // login
    \l                       // list databases in container
    \c <database-name>       // connect to container
    \d or \dt                // list tables in database
 
## Prisma
 
Update the schema in `prisma/schema.prisma`, then run one of the following:
 
**Development — creates a migration file and applies it:**
 
    npx prisma migrate dev --name <describe_your_change>
 
**Prototyping — syncs schema directly without a migration file:**
 
    npx prisma db push
 
**Production — applies pending migrations without creating new ones:**
 
    npx prisma migrate deploy
 
**Regenerate the Prisma client manually if needed:**
 
    npx prisma generate
 