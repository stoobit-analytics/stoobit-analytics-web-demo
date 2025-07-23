# Demo Website
Demo Gallery to show the possibilities of the analytics platform.

### Restart
Step 1
```shell
sudo psql -h localhost -U postgres -d analytics
```

Step 2
```sql
DELETE FROM events
WHERE project_id = '72738e69-e3ea-4e47-8e79-13f175239797';
```
