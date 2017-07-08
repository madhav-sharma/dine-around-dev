/**
 * Created by Andrey on 05/29/2017.
 */
angular.module('Filters', [])

        .filter('sumByKey', function () {
            return function (data, key) {
                if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                    return 0;
                }

                var sum = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    sum += parseInt(data[i][key]);
                }

                return sum;
            }
        })

        .filter('total', function () {
            return function (arr, field) {
                if (arr) {
                    var data = _.compact(_.pluck(arr, field));
                    var ans = _.reduce(data,
                            function (memo, num) {
                                return memo + (num * 1);
                            }, 0);
                    return ans;
                }
            };
        })

        .filter('custom', function () {
            return function (input, search) {
                if (!input)
                    return input;
                if (!search)
                    return input;
                var expected = ('' + search).toLowerCase();
                var result = {};
                angular.forEach(input, function (value, key) {
                    var actual = ('' + value).toLowerCase();
                    if (actual.indexOf(expected) !== -1) {
                        result[key] = value;
                    }
                });
                return result;
            }
        })

        .filter('sumByTotal', function () {
            return function (data, key) {
                if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                    return 0;
                }

                var sum = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].error_code == "0" || data[i].error_code == "PEN") {
                        sum += parseInt(data[i][key]);
                    }
                }

                return sum;
            }
        })

        .filter('sumByCommission', function () {
            return function (data, key) {
                if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                    return 0;
                }

                var sum = 0;
                for (var i = data.length - 1; i >= 0; i--) {
                    if (data[i].error_code == "0" || data[i].error_code == "PEN") {
                        if (data[i].extra_amount != null) {
                            sum += parseInt(data[i][key]);
                        }
                    }
                }

                return sum;
            }
        })
        .filter('propsFilter', function () {
            return function (items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    var keys = Object.keys(props);

                    items.forEach(function (item) {
                        var itemMatches = false;

                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        })

        .filter('customer', function () {
            return function (customerlist, Age, Gender, BirthAnniver) {
                var filtered_list = [];
                _.each(customerlist, function (req) {
                    var flag = true;
                    if (Age)
                        if (!req.date)
                            flag = false;
                    if (req.date && Age) {
                        var customerAge = (moment(req.birth_date).year()) - (moment().year());
                        var age1 = 0;
                        var age2 = 0;
                        if (Age * 1 == 25) {
                            age2 = 25;
                        }
                        if (Age * 1 == 40) {
                            age1 = 25;
                            age2 = 40;
                        }
                        if (Age * 1 == 60) {
                            age1 = 40;
                            age2 = 60;
                        }
                        if (Age * 1 == 100) {
                            age1 = 60;
                            age2 = 50000;
                        }
                        customerAge = Math.abs(customerAge)
                        if (customerAge >= age1 && customerAge <= age2)
                            flag = true;
                        else
                            flag = false;
                    }
                    if (req.birth_date && BirthAnniver) {
                        if (BirthAnniver === 'Birthday') {
                            if ((moment(req.birth_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (BirthAnniver === 'Anniversary') {
                            if ((moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                    }
                    if (Gender)
                        if (!req.gender)
                            flag = false;
                    if (req.gender && Gender) {
                        if (req.gender != Gender)
                            flag = false;
                    }
                    if (flag)
                        filtered_list.push(req);
                })
                return filtered_list;
            }
        })
        .filter('customerFliter', function () {
            return function (customerlist, Today, Age, Gender, BirthAnniver) {
                var filtered_list = [];
                _.each(customerlist, function (req) {
                    var flag = true;
                    if (Age)
                        if (!req.date)
                            flag = false;
                    if (req.date && Age) {
                        var customerAge = (moment(req.birth_date).year()) - (moment().year());
                        var age1 = 0;
                        var age2 = 0;
                        if (Age * 1 == 25) {
                            age2 = 25;
                        }
                        if (Age * 1 == 40) {
                            age1 = 25;
                            age2 = 40;
                        }
                        if (Age * 1 == 60) {
                            age1 = 40;
                            age2 = 60;
                        }
                        if (Age * 1 == 100) {
                            age1 = 60;
                            age2 = 50000;
                        }
                        customerAge = Math.abs(customerAge)
                        if (customerAge >= age1 && customerAge <= age2)
                            flag = true;
                        else
                            flag = false;
                    }
                    if (req.birth_date && BirthAnniver) {
                        if (BirthAnniver === 'Birthday') {
                            if ((moment(req.birth_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (BirthAnniver === 'Anniversary') {
                            if ((moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                    }
                    if (Gender)
                        if (!req.gender)
                            flag = false;
                    if (req.gender && Gender) {
                        if (req.gender != Gender)
                            flag = false;
                    }
                    if (req.date) {
                        var reqdate = moment(req.date).startOf('day')._d;
                        var todaydate = moment().startOf('day')._d;
                        var daydiff = (reqdate - todaydate) / (1000 * 60 * 60 * 24);
                        if (Today == 'today') {
                            if ((daydiff <= 0 && daydiff == -0)) {
//                                filtered_list.push(req);
                            } else {
                                flag = false;
                            }
                        }
                    }
                    if (flag)
                        filtered_list.push(req);
                })
                return filtered_list;
            }
        })

        .filter('customerbirthdayFliter', function () {
            return function (customerlist, Today, Age, Gender, BirthAnniver) {
                var filtered_list = [];
                _.each(customerlist, function (req) {
                    var flag = true;
//                    if (Age)
//                        if (!req.date)
//                            flag = false;
//                    if (req.date && Age) {
//                        var customerAge = (moment(req.birth_date).year()) - (moment().year());
//                        var age1 = 0;
//                        var age2 = 0;
//                        if (Age * 1 == 25) {
//                            age2 = 25;
//                        }
//                        if (Age * 1 == 40) {
//                            age1 = 25;
//                            age2 = 40;
//                        }
//                        if (Age * 1 == 60) {
//                            age1 = 40;
//                            age2 = 60;
//                        }
//                        if (Age * 1 == 100) {
//                            age1 = 60;
//                            age2 = 50000;
//                        }
//                        customerAge = Math.abs(customerAge)
//                        if (customerAge >= age1 && customerAge <= age2)
//                            flag = true;
//                        else
//                            flag = false;
//                    }
//                    if (req.birth_date && BirthAnniver) {
//                        if (BirthAnniver === 'Birthday') {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (BirthAnniver === 'Anniversary') {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
//                    if (Gender)
//                        if (!req.gender)
//                            flag = false;
//                    if (req.gender && Gender) {
//                        if (req.gender != Gender)
//                            flag = false;
//                    }
                    if (req.birth_date) {
                        var reqdate = moment(req.birth_date).startOf('day')._d;
                        var todaydate = moment().startOf('day')._d;
                        var daydiff = (reqdate - todaydate) / (1000 * 60 * 60 * 24);

                        if (Today == 'today') {
                            if ((daydiff == -0)) {
//                                filtered_list.push(req);
                            } else {
                                flag = false;
                            }
                        }
                    }
                    if (flag)
                        filtered_list.push(req);
                })
                return filtered_list;
            }
        })
        .filter('customeranniversaryFliter', function () {
            return function (customerlist, Today, Age, Gender, BirthAnniver) {
                var filtered_list = [];
                _.each(customerlist, function (req) {
                    var flag = true;
//                    if (Age)
//                        if (!req.date)
//                            flag = false;
//                    if (req.date && Age) {
//                        var customerAge = (moment(req.birth_date).year()) - (moment().year());
//                        var age1 = 0;
//                        var age2 = 0;
//                        if (Age * 1 == 25) {
//                            age2 = 25;
//                        }
//                        if (Age * 1 == 40) {
//                            age1 = 25;
//                            age2 = 40;
//                        }
//                        if (Age * 1 == 60) {
//                            age1 = 40;
//                            age2 = 60;
//                        }
//                        if (Age * 1 == 100) {
//                            age1 = 60;
//                            age2 = 50000;
//                        }
//                        customerAge = Math.abs(customerAge)
//                        if (customerAge >= age1 && customerAge <= age2)
//                            flag = true;
//                        else
//                            flag = false;
//                    }
//                    if (req.birth_date && BirthAnniver) {
//                        if (BirthAnniver === 'Birthday') {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (BirthAnniver === 'Anniversary') {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
//                    if (Gender)
//                        if (!req.gender)
//                            flag = false;
//                    if (req.gender && Gender) {
//                        if (req.gender != Gender)
//                            flag = false;
//                    }
                    if (req.anniversary_date) {
                        var reqdate = moment(req.anniversary_date).startOf('day')._d;
                        var todaydate = moment().startOf('day')._d;
                        var daydiff = (reqdate - todaydate) / (1000 * 60 * 60 * 24);
                        if (Today == 'today') {
                            if ((daydiff == -0)) {
//                                filtered_list.push(req);
                            } else {
                                flag = false;
                            }
                        }
                    }
                    if (flag)
                        filtered_list.push(req);
                })
                return filtered_list;
            }
        })

        .filter('messagecustomer', function ($rootScope) {
            return function (customerlist, age25, age40, age60, age100, genderMale, genderFemale, ThisMonethBirthday, ThisMonethAnniversary) {
                var filtered_list = [];
                _.each(customerlist, function (req) {
                    var flag = true;
                    var Age = false;
                    var Gender = true;
                    var Birthday = true;
                    var Anniversary = true;
                    var customerAge;
                    if (req.date) {
                        customerAge = (moment(req.birth_date).year()) - (moment().year());
                    }
                    customerAge = Math.abs(customerAge);
                    //New Task
//                    if (age25) {
//                        if (customerAge >= 0 && customerAge <= 25)
//                            console.log('25');
//                        else
//                            flag = false;
//                        if (genderMale && !genderFemale) {
//                            if (req.gender != 'Male')
//                                flag = false;
//                        }
//                        if (genderFemale && !genderMale) {
//                            if (req.gender != 'Female')
//                                flag = false;
//                        }
//                        if (genderMale && genderFemale) {
//                            if (!req.gender) {
//                                flag = false;
//                            }
//                        }
//                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethBirthday && ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
//                    if (age40) {
//                        if (customerAge > 25 && customerAge <= 40)
//                            console.log('40');
//                        else
//                            flag = false;
//                        if (genderMale && !genderFemale) {
//                            if (req.gender != 'Male')
//                                flag = false;
//                        }
//                        if (genderFemale && !genderMale) {
//                            if (req.gender != 'Female')
//                                flag = false;
//                        }
//                        if (genderMale && genderFemale) {
//                            if (!req.gender) {
//                                flag = false;
//                            }
//                        }
//                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethBirthday && ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
//                    if (age60) {
//                        flag = true;
//                        if (customerAge > 40 && customerAge <= 60)
//                            console.log('60');
//                        else
//                            flag = false;
//                        if (genderMale && !genderFemale) {
//                            if (req.gender != 'Male')
//                                flag = false;
//                        }
//                        if (genderFemale && !genderMale) {
//                            if (req.gender != 'Female')
//                                flag = false;
//                        }
//                        if (genderMale && genderFemale) {
//                            if (!req.gender) {
//                                flag = false;
//                            }
//                        }
//                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethBirthday && ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
//                    if (age100) {
//                        flag = true;
//                        if (customerAge > 60 && customerAge <= 50000)
//                            console.log('60');
//                        else
//                            flag = false;
//                        if (genderMale && !genderFemale) {
//                            if (req.gender != 'Male')
//                                flag = false;
//                        }
//                        if (genderFemale && !genderMale) {
//                            if (req.gender != 'Female')
//                                flag = false;
//                        }
//                        if (genderMale && genderFemale) {
//                            if (!req.gender) {
//                                flag = false;
//                            }
//                        }
//                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
//                            if ((moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                        if (ThisMonethBirthday && ThisMonethAnniversary) {
//                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
//                                flag = false;
//                        }
//                    }
                    if (age25 && !age40 && !age60 && !age100) {
                        flag = false;
                        if (customerAge >= 0 && customerAge <= 25)
                            flag = true;
                    } else if (!age25 && age40 && !age60 && !age100) {
                        flag = false;
                        if (customerAge > 25 && customerAge <= 40)
                            flag = true;
                    } else if (!age25 && !age40 && age60 && !age100) {
                        flag = false;
                        if (customerAge > 40 && customerAge <= 60)
                            flag = true;
                    } else if (!age25 && !age40 && !age60 && age100) {
                        flag = false;
                        if (customerAge > 60 && customerAge <= 50000)
                            flag = true;
                    } else if (age25 && age40 && !age60 && !age100) {
                        flag = false;
                        if (customerAge >= 0 && customerAge <= 25 || customerAge > 25 && customerAge <= 40)
                            flag = true;
                    } else if (age25 && age60 && !age40 && !age100) {
                        flag = false;
                        if (customerAge >= 0 && customerAge <= 25 || customerAge > 40 && customerAge <= 60)
                            flag = true;
                    } else if (age25 && age100 && !age60 && !age40) {
                        flag = false;
                        if (customerAge >= 0 && customerAge <= 25 || customerAge > 60 && customerAge <= 5000)
                            flag = true;
                    } else if (age40 && age25 && !age60 && !age100) {
                        flag = false;
                        if (customerAge > 25 && customerAge <= 40 || customerAge >= 0 && customerAge <= 25)
                            flag = true;
                    } else if (age40 && age60 && !age25 && !age100) {
                        if (customerAge > 25 && customerAge <= 40 || customerAge > 40 && customerAge <= 60)
                            flag = true;
                    } else if (age40 && age100 && !age60 && !age25) {
                        flag = false;
                        if (customerAge > 25 && customerAge <= 40 || customerAge > 60 && customerAge <= 5000)
                            flag = true;
                    } else if (age60 && age25 && !age40 && !age100) {
                        flag = false;
                        if (customerAge > 40 && customerAge <= 60 || customerAge >= 0 && customerAge <= 25)
                            flag = true;
                    } else if (age60 && age40 && !age25 && !age100) {
                        flag = false;
                        if (customerAge > 40 && customerAge <= 60 || customerAge > 25 && customerAge <= 40)
                            flag = true;
                    } else if (age60 && age100 && !age25 && !age100) {
                        flag = false;
                        if (customerAge > 40 && customerAge <= 60 || customerAge > 60 && customerAge <= 5000)
                            flag = true;
                    } else if (age100 && age25 && !age60 && !age40) {
                        flag = false;
                        if (customerAge > 60 && customerAge <= 5000 || customerAge >= 0 && customerAge <= 25)
                            flag = true;
                    } else if (age100 && age40 && !age60 && !age25) {
                        flag = false;
                        if (customerAge > 60 && customerAge <= 5000 || customerAge > 25 && customerAge <= 40)
                            flag = true;
                    } else if (age100 && age60 && !age25 && !age40) {
                        flag = false;
                        if (customerAge > 60 && customerAge <= 5000 || customerAge > 40 && customerAge <= 60)
                            flag = true;
                    } else if (age25 && age40 && age60 && !age100) {
                        flag = false;
                        if (customerAge >= 0 && customerAge <= 25 || customerAge > 25 && customerAge <= 40 || customerAge > 40 && customerAge <= 60)
                            flag = true;
                    } else if (!age25 && age40 && age60 && age100) {
                        flag = false;
                        if (customerAge > 25 && customerAge <= 40 || customerAge > 40 && customerAge <= 60 || customerAge > 60 && customerAge <= 50000)
                            flag = true;
                    } else if (age25 && !age40 && age60 && age100) {
                        flag = false;
                        if (customerAge > 40 && customerAge <= 60 || customerAge > 60 && customerAge <= 50000 || customerAge >= 0 && customerAge <= 25)
                            flag = true;
                    } else if (age25 && age40 && !age60 && age100) {
                        flag = false;
                        if (customerAge > 60 && customerAge <= 50000 || customerAge >= 0 && customerAge <= 25 || customerAge > 25 && customerAge <= 40)
                            flag = true;
                    } else if (age25 && age40 && age60 && age100) {
                        flag = false;
                        if (req.date)
                            flag = true;
                    }
                    if (genderMale && !genderFemale) {
                        if (req.gender != 'Male')
                            flag = false;
                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
                            if ((moment(req.birth_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
                            if ((moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (ThisMonethBirthday && ThisMonethAnniversary) {
                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                    }
                    if (genderFemale && !genderMale) {
                        if (req.gender != 'Female')
                            flag = false;
                        if (ThisMonethBirthday && !ThisMonethAnniversary) {
                            if ((moment(req.birth_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (ThisMonethAnniversary && !ThisMonethBirthday) {
                            if ((moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                        if (ThisMonethBirthday && ThisMonethAnniversary) {
                            if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
                                flag = false;
                        }
                    }
                    if (genderMale && genderFemale) {
                        if (!req.gender) {
                            flag = false;
                        }
                    }
                    if (ThisMonethBirthday && !ThisMonethAnniversary) {
                        if ((moment(req.birth_date).month()) != (moment().month()))
                            flag = false;
                    }
                    if (ThisMonethAnniversary && !ThisMonethBirthday) {
                        if ((moment(req.anniversary_date).month()) != (moment().month()))
                            flag = false;
                    }
                    if (ThisMonethBirthday && ThisMonethAnniversary) {
                        if ((moment(req.birth_date).month()) != (moment().month()) && (moment(req.anniversary_date).month()) != (moment().month()))
                            flag = false;
                    }
                    if (flag)
                        filtered_list.push(req);
                    //End New Task
//                    if (age25) {
//                        if (customerAge >= 0 && customerAge <= 25)
//                            Age = true;
//                        else
//                            Age = false;
//                    }
//                    if (age40 && Age)
//                        Age = flag = false;
//                    if (age40 && !Age && flag) {
//                        if (customerAge > 25 && customerAge <= 40)
//                            Age = true;
//                        else
//                            Age = false;
//                    }
//                    if (age60 && Age)
//                        Age = flag = false;
//                    if (age60 && !Age) {
//                        if (customerAge > 40 && customerAge <= 60)
//                            Age = true;
//                        else
//                            Age = false;
//                    }
//                    if (age100 && Age)
//                        Age = flag = false;
//                    if (age100 && !Age) {
//                        if (customerAge > 60 && customerAge <= 50000)
//                            Age = true;
//                        else
//                            Age = false;
//                    }
//                    if (!age25 && !age40 && !age60 && !age100) {
//                        Age = true;
//                    }
//                    if (genderMale && !genderFemale) {
//                        if (req.gender != 'Male')
//                            flag = false;
//                        else
//                            flag = true;
//                    }
//                    if (genderFemale && !genderMale) {
//                        if (req.gender != 'Female')
//                            flag = false;
//                        else
//                            flag = true;
//                    }
//                    if (genderMale && genderFemale) {
//                        if (!req.gender) {
//                            flag = false;
//                        }
//                    }
//                    if (ThisMonethBirthday) {
//                        if ((moment(req.birth_date).month()) != (moment().month()))
//                            flag = false;
//                        else
//                            flag = true;
//                    }
//                    if (ThisMonethAnniversary) {
//                        if ((moment(req.anniversary_date).month()) != (moment().month()))
//                            flag = false;
//                        else
//                            flag = true;
//                    }
//                    if (Age || Gender || Birthday || Anniversary)
//                        filtered_list.push(req);
                })
                $rootScope.SendMessageCustomer = filtered_list;
                return filtered_list;
            }
        })

