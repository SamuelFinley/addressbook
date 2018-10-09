angular.module('contactModule')
.service('startPageService', ['$http',function(http) {

  this.toggle = (response) => {
    (response == true) ? (response = false) : (response = true);
    return response;
  };


  this.getContacts = () => {
    var xhttp = new XMLHttpRequest();
    let address ={
      contacts : []
    };
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

         let i;
         const nodes = xhttp.responseXML.getElementsByTagName("AddressBook")[0]
         for (i = 0; i < nodes.children.length; i++) { 
          address.contacts.push({ 
            "CustomerID" : (nodes.children[i].getElementsByTagName("CustomerID").length === 0) ? '' : nodes.children[i].getElementsByTagName("CustomerID")[0].textContent,
            "CompanyName" : (nodes.children[i].getElementsByTagName("CompanyName").length === 0) ? '' : nodes.children[i].getElementsByTagName("CompanyName")[0].textContent,
            "ContactName" : (nodes.children[i].getElementsByTagName("ContactName").length === 0) ? '' : nodes.children[i].getElementsByTagName("ContactName")[0].textContent,
            "ContactTitle" : (nodes.children[i].getElementsByTagName("ContactTitle").length === 0) ? '' : nodes.children[i].getElementsByTagName("ContactTitle")[0].textContent,
            "Address" : (nodes.children[i].getElementsByTagName("Address").length === 0) ? '' : nodes.children[i].getElementsByTagName("Address")[0].textContent,
            "City" : (nodes.children[i].getElementsByTagName("City").length === 0) ? '' : nodes.children[i].getElementsByTagName("City")[0].textContent, 
            "Email" : (nodes.children[i].getElementsByTagName("Email").length === 0) ? '' : nodes.children[i].getElementsByTagName("Email")[0].textContent, 
            "PostalCode" : (nodes.children[i].getElementsByTagName("PostalCode").length === 0) ? '' : nodes.children[i].getElementsByTagName("PostalCode")[0].textContent, 
            "Country" : (nodes.children[i].getElementsByTagName("Country").length === 0) ? '' : nodes.children[i].getElementsByTagName("Country")[0].textContent, 
            "Phone" : (nodes.children[i].getElementsByTagName("Phone").length === 0) ? '' : nodes.children[i].getElementsByTagName("Phone")[0].textContent, 
            "Fax" : (nodes.children[i].getElementsByTagName("Fax").length === 0) ? '' : nodes.children[i].getElementsByTagName("Fax")[0].textContent, 
        });

      }
      }
  };
  this.contacts = address.contacts
    xhttp.open("GET", "ab.xml", true);
    xhttp.send();
  }

  this.sortContacts = (key) => {
    console.log(this.contacts)
   /*  let i;
    for (i = 0; i < this.contacts.length; i++) { 
      this.contacts[i]
    }
    array.forEach(element => {});
    let index = this.contacts.map(contact => { contact[key]; }).indexOf('stevie'); */
  }
}])
