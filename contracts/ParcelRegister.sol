pragma solidity ^0.4.13;

contract ParcelRegister {

  struct Record {
  uint40 timestamp;
  int lat;
  int long;
  string note;
  }

  mapping(bytes32 => bytes32[]) public recordHashByParcelHash;
  mapping(bytes32 => Record) public recordsByRecordHash;

  function addRecord(uint40 _timestamp, int _lat, int _long, string _note, bytes32 _parcelHash) public {
    bytes32 recordHash = getRecordHash(_timestamp, _lat, _long, _note);

    recordsByRecordHash[recordHash].timestamp = _timestamp;
    recordsByRecordHash[recordHash].lat = _lat;
    recordsByRecordHash[recordHash].long = _long;
    recordsByRecordHash[recordHash].note = _note;
    recordHashByParcelHash[_parcelHash].push(recordHash);
  }

  function startParcel(uint40 _timestamp, int _lat, int _long, string _note, string _parcelName) public returns (bytes32) {
    bytes32 parcelHash = getStringHash(_parcelName);
    bytes32 recordHash = getRecordHash(_timestamp, _lat, _long, _note);

    recordsByRecordHash[recordHash].timestamp = _timestamp;
    recordsByRecordHash[recordHash].lat = _lat;
    recordsByRecordHash[recordHash].long = _long;
    recordsByRecordHash[recordHash].note = _note;
    recordHashByParcelHash[parcelHash].push(recordHash);

    return parcelHash;
  }

  function getParcelRecords(bytes32 parcelHash) public constant returns (bytes32[]) {
    return recordHashByParcelHash[parcelHash];
  }

  function getRecord(bytes32 recordHash) public constant returns (uint40, int, int, string) {
    return (
    recordsByRecordHash[recordHash].timestamp,
    recordsByRecordHash[recordHash].lat,
    recordsByRecordHash[recordHash].long,
    recordsByRecordHash[recordHash].note
    );
  }

  function getStringHash(string stringIn)  public constant returns (bytes32) {
    return keccak256(stringIn);
  }
  function getRecordHash(uint40 timestamp, int lat, int long, string note) public constant returns (bytes32) {
    return keccak256(timestamp, lat, long, note);
  }
  function getFucks() public constant returns (uint) {
    return 0;
  }
}
