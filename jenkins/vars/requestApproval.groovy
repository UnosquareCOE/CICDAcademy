#!/usr/bin/groovy
def call(Map parameters = [:]) {
    echo 'requestApproval: ' + parameters

    def environment = parameters.get('environment')
    def time = parameters.get('time', 5)
    def unit = parameters.get('unit', 'DAYS')
    def approver = ''

    timeout(time: time, unit: unit) {
        approver = input submitterParameter: 'submitter', message: "Approve deploy to ${environment}", ok: 'Deploy'
    }

    // notify to slack etc.
}
