
import com.cloudbees.groovy.cps.NonCPS



@NonCPS
		def getBuildtriggerCause(){
		startedByTimer = false
		def buildCauses = currentBuild.rawBuild.getCauses()
		for ( buildCause in buildCauses ) {
			if (buildCause != null) {
				def causeDescription = buildCause.getShortDescription()
				if (causeDescription.contains("Started by timer")) {
					startedByTimer = true
				}
			}
		}
		return causeDescription
	}
