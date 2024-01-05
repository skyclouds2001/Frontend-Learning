class SelectURLOperation {
  async run() {
    console.dir(SharedStorageWorklet)
    return 0;
  }
}

// Register the operation as 'hover-event'
register('hover-event', SelectURLOperation);
