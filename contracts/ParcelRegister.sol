pragma solidity ^0.4.13;

contract ParcelRegister {

  struct Record {
  uint40 timestamp;
  int lat;
  int long;
  string note;
  }

  event ParcelMade(bytes32 parcelHash, address parcelSender);

  mapping(bytes32 => bytes32[]) public __recordHashByParcelHash;
  mapping(bytes32 => Record) public __recordByRecordHash;

  function addRecord(uint40 _timestamp, int _lat, int _long, string _note, bytes32 _parcelHash) public {
    bytes32 recordHash = getRecordHash(_timestamp, _lat, _long, _note);

    __recordByRecordHash[recordHash].timestamp = _timestamp;
    __recordByRecordHash[recordHash].lat = _lat;
    __recordByRecordHash[recordHash].long = _long;
    __recordByRecordHash[recordHash].note = _note;
    __recordHashByParcelHash[_parcelHash].push(recordHash);
  }

  function startParcel(uint40 _timestamp, int _lat, int _long, string _note, string _parcelName) public {
    bytes32 parcelHash = getParcelHash(_parcelName, _timestamp);

    addRecord(_timestamp, _lat, _long, _note, parcelHash);

    ParcelMade(parcelHash, msg.sender);
  }

  function recordHashByParcelHash(bytes32 _parcelHash) public constant returns (bytes32[]) {
    return __recordHashByParcelHash[_parcelHash];
  }

  function recordByRecordHash(bytes32 recordHash) public constant returns (uint40, int, int, string) {
    return (
    __recordByRecordHash[recordHash].timestamp,
    __recordByRecordHash[recordHash].lat,
    __recordByRecordHash[recordHash].long,
    __recordByRecordHash[recordHash].note
    );
  }

  function getParcelHash(string name, uint40 timestamp)  public constant returns (bytes32) {
    return keccak256(name, timestamp);
  }
  function getRecordHash(uint40 timestamp, int lat, int long, string note) public constant returns (bytes32) {
    return keccak256(timestamp, lat, long, note);
  }
  function getFucks() public constant returns (uint) {
    return 0;
  }
}
