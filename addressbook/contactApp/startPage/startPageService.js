angular.module('contactModule')
  .service('startPageService', ['$http', function (http) {

    this.toggle = (response) => {
      (response == true) ? (response = false) : (response = true);
      return response;
    };

    this.colors = (index) => {
      return index % 2 === 0 ? '#dddddd' : 'white';
    };


    this.getContacts = () => {
      var xhttp = new XMLHttpRequest();
      let address = {
        contacts: []
      };
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let i;
          const nodes = xhttp.responseXML.getElementsByTagName("AddressBook")[0]
          for (i = 0; i < nodes.children.length; i++) {
            address.contacts.push({
              "CustomerID": (nodes.children[i].getElementsByTagName("CustomerID").length === 0) ? '' : nodes.children[i].getElementsByTagName("CustomerID")[0].textContent,
              "CompanyName": (nodes.children[i].getElementsByTagName("CompanyName").length === 0) ? '' : nodes.children[i].getElementsByTagName("CompanyName")[0].textContent,
              "ContactName": (nodes.children[i].getElementsByTagName("ContactName").length === 0) ? '' : nodes.children[i].getElementsByTagName("ContactName")[0].textContent,
              "ContactTitle": (nodes.children[i].getElementsByTagName("ContactTitle").length === 0) ? '' : nodes.children[i].getElementsByTagName("ContactTitle")[0].textContent,
              "Address": (nodes.children[i].getElementsByTagName("Address").length === 0) ? '' : nodes.children[i].getElementsByTagName("Address")[0].textContent,
              "City": (nodes.children[i].getElementsByTagName("City").length === 0) ? '' : nodes.children[i].getElementsByTagName("City")[0].textContent,
              "Email": (nodes.children[i].getElementsByTagName("Email").length === 0) ? '' : nodes.children[i].getElementsByTagName("Email")[0].textContent,
              "PostalCode": (nodes.children[i].getElementsByTagName("PostalCode").length === 0) ? '' : nodes.children[i].getElementsByTagName("PostalCode")[0].textContent,
              "Country": (nodes.children[i].getElementsByTagName("Country").length === 0) ? '' : nodes.children[i].getElementsByTagName("Country")[0].textContent,
              "Phone": (nodes.children[i].getElementsByTagName("Phone").length === 0) ? '' : nodes.children[i].getElementsByTagName("Phone")[0].textContent,
              "Fax": (nodes.children[i].getElementsByTagName("Fax").length === 0) ? '' : nodes.children[i].getElementsByTagName("Fax")[0].textContent,
              "idx": i
            });
          }
        }
      };
      this.contacts = this.dupe = this.dupe2 = address.contacts
      this.keys = ["none", "CustomerID", "CompanyName", "ContactName", "ContactTitle", "Address", "City", "Email", "PostalCode", "Country", "Phone", "Fax"];
      xhttp.open("GET", "ab.xml", true);
      xhttp.send();
    }

    this.contactSort = (event, order) => {
      if (event.target.id !== this.last) {
        order = null
      }
      let sorted = this.contacts.sort((a, b) => {
        let A = a[event.target.id].toUpperCase();
        let B = b[event.target.id].toUpperCase();
        switch (true) {
          case A < B:
            return -1;
            break;
          case A > B:
            return 1;
            break;
          default:
            return 0;
        }
      });
      switch (true) {
        case order == '▼':
          let reverse = [];
          for (i = sorted.length - 1; i > -1; i--) {
            reverse.push(sorted[i])
          }
          this.dupe = reverse
          order = '▲'
          break;
        case order == '▲':
          this.dupe = sorted
          order = '▼'
          break;
        default:
          this.dupe = sorted
          order = '▼'
      }
      this.last = event.target.id
      return [event.target.id, order]
    }

    this.search = (input, category) => {

      let re = new RegExp('\\b' + input+ '\\b', 'gi');
      let indicies = [];
      if (category == undefined || category === 'none'){
      let crudeGlobal = this.dupe.map(contact => {
        let aggregate = '';
        let i;
        for (i = 1; i < this.keys.length; i++) {
          aggregate += ' ' + contact[this.keys[i]]
        }
        return aggregate
      });
      for (i = 0; i < crudeGlobal.length; i++) {
        if (crudeGlobal[i].match(re) !== null) {
          indicies.push(i)
        }
      }
    } else {
      let crudeGlobal = this.dupe.map(contact => {return contact[category]});
      for (i = 0; i < crudeGlobal.length; i++) {
        if (crudeGlobal[i].match(re) !== null) {
          indicies.push(i)
        }
      }
    }
      this.dupe2 = indicies.map(indx => { return this.contacts[indx] })
      this.indx = indicies
    }
    this.show = () => {
      this.indx = '';
      this.dupe2 = this.contacts
    }
  }])
