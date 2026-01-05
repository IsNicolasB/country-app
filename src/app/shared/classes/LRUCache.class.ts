export class LRUCache<K,V>{
  private cache = new Map<K,{value: V, date : Date}>();

  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    // No existe
    if(!this.cache.has(key)) return undefined; 
    
    const value = this.cache.get(key)!;

    if(this.cache.get(key)!.date < new Date(Date.now())){
      //Existe pero ya expiró
      // console.log('Tiempo expirado')
      this.cache.delete(key);
      return undefined;
    }

    this.cache.delete(key);
    this.cache.set(key, value); // Reinsertar para actualizar el orden
    
    return value.value;
  }

  set( key : K , value : V, ttlMs: number) : void {

    // Actualizar si ya existe
    if(this.cache.has(key)){
      this.cache.delete(key);
      const expirationDate = new Date(Date.now() + ttlMs);
      this.cache.set(key, { value, date: expirationDate });
      return;
    }

    // Si la capacidad se ha alcanzado, eliminar el menos recientemente usado
    if(this.cache.size >= this.capacity){
      // Eliminar el elemento menos recientemente usado (el primero en el Map)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey!);
    }

    const expirationDate = new Date(Date.now() + ttlMs);
    this.cache.set(key, { value, date: expirationDate });
  }

}
