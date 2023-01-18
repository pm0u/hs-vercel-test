# Data Migration Cheatsheet

All of these can be run from the Sanity CLI when messing w/ data.

## Query Documents

### Get all data for the Document type

`sanity documents query "*[_type == 'etaIndustry2021']"`

### Get all the id's for the type

`sanity documents query "*[_type == 'etaIndustry2021']._id"`

## "Dirty" Bulk Delete from command line

https://www.sanity.io/answers/hey-all-what-s-the-quickest-way-to-batch-delete-p1611882249316400

```// Example will delete all 'etaIndustry2021' documents
// 1) Get all the ids for each document
sanity documents query "*[_type == 'etaIndustry2021']._id"
// 2) Copy all the id's returned, manually remove the commas, and put them all on one line
// 3) Run sanity documents delete and paste the single line list of ids from the previous step
sanity documents delete "drafts.etaIndustry2021_1736" "etaIndustry2021_1735"
```

## Bulk import from ndjson file

https://www.sanity.io/docs/importing-data

**All imports need to be run from Sanity root directory after Sanity v3 upgrade**

### Initial Import

`sanity dataset import ndjson-imports/2021EtaIndustries.ndjson staging`

### Overwrite existing documents - removes the data that already exists - BE CAREFUL

If you specify \_id in the imported data, this flag can be very useful. It will let you reimport stuff that you got wrong in an earlier pass.
`sanity dataset import ndjson-imports/2021EtaIndustries.ndjson staging --replace`

### Update existing data - Only create documents which don't exist, leave the rest alone.

`sanity dataset import ndjson-imports/2021EtaIndustries.ndjson staging --missing`
