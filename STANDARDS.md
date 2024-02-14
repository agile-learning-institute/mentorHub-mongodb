# Mongo Standards

- Every collection has a name attribute with a unique index
- Every collection has a status attribute with at least ``Active`` and ``Archived`` status. Archived is our soft-delete indicator.
- Every collection has a version document with a name and version attribute. Ther name of the version document is ``VERSION``
- Something about testdata and $oid
