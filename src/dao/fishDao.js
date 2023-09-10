class FishDao {
  constructor(db) {
    this.db = db;
  }

  async getAllFish() {
    const fishCollection = this.db.collection("fish");
    const fish = await fishCollection.find({}).toArray();
    return fish;
  }

  async closeConnection() {
    if (this.db) {
      await this.db.client.close();
    }
  }
}

module.exports = FishDao;
