export {}
declare global {
    interface Number {
          positiveSign: () => string;
          prefix: () => string;
    }
}

Number.prototype.positiveSign = function() : string {
  return (this.valueOf()>0 ? "+" : "") + this.valueOf();

}
Number.prototype.prefix = function() : string {
  return this.valueOf()>0 ? "+" : "";

}


