# Strength Plus

A Simple Data Entry App for Strength Training.

## Deployment

This application is deployed to Flyio.

### Sqlite

The sqlite database lives at /data/sqlite.db in your deployed application. You can connect to the live database by running `fly ssh console -C database-cli`.

### Creating a volume

You can create a volume for the application by running the following commands:

```bash
fly volumes create data --size 1 --app strength-plus
fly volumes create data --size 1 --app strength-plus-staging
```

- You will want to create multiple volumes for each environment you have.

## Devlopment

There are two branches for this application: `main` and `staging`. The `main` branch is for production and the `staging` branch is for staging. We always push changes to `staging` first and then merge those changes into `main` when we are ready to deploy.
