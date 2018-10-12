import Album from './models/album'

async function run() {
  // const album = await Album.findById(1, ['user', 'photos'])
  // console.log(album)
  // const albums = await Album.find({userId: 1});
  // console.log(albums);

  // CREATE
  let album5 = await Album.create({id: 5, title: 'Ma bite du 62', userId: 2})
  console.log(album5);

  // FIND ID
  const album = await Album.findById(5, ['user', 'photos'])
  console.log(album)

  // UPDATE
  album5 = await Album.updateById(5, {title: 'Ma bite du 93'})
  console.log(album5);

  // FIND FILTER
  const albums = await Album.find({userId: 2});
  console.log(albums);

  // DELETE
  const isDelete = await Album.deleteById(5);
  console.log(isDelete);


  debugger
}

run().catch((err) => {
  console.error(err)
})